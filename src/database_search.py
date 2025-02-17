import math
import csv
import json
from sortedcontainers import SortedList

class DateConstraint:
    CLOSE_TEXT = "Currently closed"
    OPEN_TEXT = "24 hours"
    VARIABLE_TEXT = "Variable hours"
    DAYLIGHT_TEXT = "Daylight hours"
    VENUE_TEXT = "Venue hours"
    
    DAYS = {
        'Mon' : 0,
        'Tue' : 1,
        'Wed' : 2,
        'Thu' : 3,
        'Fri' : 4,
        'Sat' : 5,
        'Sun' : 6
    }

    MONTHS = {
        'Jan' : 0,
        'Feb' : 1,
        'Mar' : 2,
        'Apr' : 3,
        'May' : 4,
        'Jun' : 5,
        'Jul' : 6,
        'Aug' : 7,
        'Sep' : 8,
        'Oct' : 9,
        'Nov' : 10,
        'Dec' : 11
    }

    @staticmethod
    def timeToMilitary(time):
        meridiem = time[-2:]
        baseTime = time[:-2]

        baseTime = list(map(int, baseTime.split(':')))
        hour = baseTime[0] if len(baseTime) == 1 else baseTime[0] + baseTime[1] / 60

        return hour + (12 if meridiem == 'pm' else 0)
    
    def isMonthValid(month, monthConstraint):
        monthConstraint = list(map(lambda x: DateConstraint.MONTHS[x], monthConstraint.split('-')))
        return month == monthConstraint if len(monthConstraint) == 1 else (
            month >= monthConstraint[0] and month <= monthConstraint[1] if monthConstraint[1] > monthConstraint[0] else 
            month >= monthConstraint[0] or month <= monthConstraint[1]
        )
    
    def isDayValid(day, dayConstraint):
        print(day)
        print(dayConstraint)
        dayConstraint = list(map(lambda x: DateConstraint.DAYS[x], dayConstraint.split('-')))
        print(dayConstraint)
        return day == dayConstraint[0] if len(dayConstraint) == 1 else (
            day >= dayConstraint[0] and day <= dayConstraint[1] if dayConstraint[1] > dayConstraint[0] else
            day >= dayConstraint[0] or day <= dayConstraint[1]
        )

    @staticmethod
    def isTimeValid(time, timeConstraint):
        timeConstraint = list(map(DateConstraint.timeToMilitary, timeConstraint.split('-')))
        return time == timeConstraint[0] if len(timeConstraint) == 1 else (
            time >= timeConstraint[0] and time <= timeConstraint[1] if timeConstraint[1] > timeConstraint[0] else
            time >= timeConstraint[0] or time <= timeConstraint[1]
        )
    
    def isMonthConstraint(constraint):
        constraint = constraint.split('-')
        return constraint[0] in DateConstraint.MONTHS
    
    def isDayConstraint(constraint):
        constraint = constraint.split('-')
        return constraint[0] in DateConstraint.DAYS
    
    def isDateTimeValid(month, day, hour, dateTimeConstraint):
        if dateTimeConstraint == DateConstraint.CLOSE_TEXT: return False
        assert dateTimeConstraint[:6] == 'OPEN: '
        dateTimeConstraint = dateTimeConstraint[6:]

        if dateTimeConstraint == DateConstraint.OPEN_TEXT: return True
        if dateTimeConstraint == DateConstraint.VARIABLE_TEXT: return False # TODO
        if dateTimeConstraint == DateConstraint.VARIABLE_TEXT:
            return False # TODO
        if dateTimeConstraint == DateConstraint.VENUE_TEXT: return False

        dateTimeConstraint = dateTimeConstraint.split(', ')
        for constraint in dateTimeConstraint:
            constraint = constraint.split(' ')
            n = 0
            if DateConstraint.isMonthConstraint(constraint[n]):
                print('MONTH CHECK:', constraint[n], month)
                if not DateConstraint.isMonthValid(month, constraint[n]): continue
                n += 1
            
            if DateConstraint.isDayConstraint(constraint[n]):
                print('DAY CHECK:', constraint[n], day)
                if not DateConstraint.isDayValid(day, constraint[n]): continue
                n += 1

            print('TIME CHECK:', constraint[n], hour)
            if DateConstraint.isTimeValid(hour, constraint[n]): return True
        
        return False
    

class DatabaseSearch:
    DATABASE_PATH = 'database/toilet_map.csv'
    USER_DATABASE_PATH = 'database/user_toilet_map.csv'
    DATABASE_FIELD_NAMES = [
        "FacilityID","URL","Name","FacilityType","Address1","Town","State","AddressNote","Latitude","Longitude","Parking","ParkingAccessible","ParkingNote","KeyRequired","MLAK24","MLAKAfterHours","PaymentRequired","AccessNote","AdultChange","ChangingPlaces","BYOSling","ACShower","ACMLAK","AdultChangeNote","BabyChange","BabyCareRoom","BabyChangeNote","DumpPoint","DPWashout","DPAfterHours","DumpPointNote","OpeningHours","OpeningHoursNote","Male","Female","Unisex","AllGender","Ambulant","Accessible","LHTransfer","RHTransfer","ToiletNote","SharpsDisposal","DrinkingWater","SanitaryDisposal","MensPadDisposal","Shower"
    ]

    def distance(x1, y1, x2, y2):
        return math.sqrt(math.pow(x2 - x1, 2) + math.pow(y2 - y1, 2))
    
    def distanceLatLong(lat1, long1, lat2, long2):
        long1, lat1, long2, lat2= tuple(map(math.radians, (long1, lat1, long2, lat2)))

        return math.acos(
            math.sin(lat1) * math.sin(lat2)
            + math.cos(lat1) * math.cos(lat2) * math.cos(long2 - long1)
            ) * 6371

    def deleteEmptyStrings(arr):
        return list(i for i in arr if i != '')
    
    def add(data):
        with open(DatabaseSearch.USER_DATABASE_PATH, 'a', encoding="utf8") as file:
            writer = csv.DictWriter(file, fieldnames=DatabaseSearch.DATABASE_FIELD_NAMES, quoting=1)
            writer.writerows([data])

    def search(
            lat,
            long,
            searchResults,
            time,
            requirements,
    ):
        closest = SortedList(key = lambda value: value['distance'])

        with open(DatabaseSearch.DATABASE_PATH, encoding="utf8") as file:
            reader = csv.DictReader(file)
            for row in reader:
                for requirement in requirements:
                    if (row[requirement] != 'True'): continue

                closest.add(
                    {
                        'distance' : DatabaseSearch.distanceLatLong(lat, long, float(row['Latitude']), float(row['Longitude'])),
                        'lat' : float(row['Latitude']),
                        'long' : float(row['Longitude']),
                        'name' : row['Name'],
                        'time' : row['OpeningHours'],
                        'notes' : ' '.join(
                            DatabaseSearch.deleteEmptyStrings([
                            row['AddressNote'],
                            row['ParkingNote'],
                            row['AccessNote'],
                            row['AdultChangeNote'],
                            row['BabyChangeNote'],
                            row['DumpPointNote'],
                            row['ToiletNote']
                        ])),
                        'Parking' : row['Parking'],
                        'ParkingAccessible' : row['ParkingAccessible'],
                        'Accessible' : row['Accessible'],
                        'BabyChange' : row['BabyChange'],
                        'BabyCareRoom' : row['BabyCareRoom'],
                        'DrinkingWater' : row['DrinkingWater'],
                        'SanitaryDisposal' : row['SanitaryDisposal'],
                        'Shower' : row['Shower'],
                        'DumpPoint' : row['DumpPoint'],
                    }
                )

                if len(closest) > searchResults:
                    del closest[-1]
        
        return json.dumps(list(closest))
    
print(DatabaseSearch.add({'Latitude' : 1, 'Longitude' : 2, 'FacilityType' : 'aa'}))