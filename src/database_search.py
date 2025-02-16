import math
import csv

class DateConstraint:
    CLOSE_TEXT = "Currently closed"
    OPEN_TEXT = "Always open"
    
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

    def timeToMilitary(time):
        meridiem = time[-2:]
        baseTime = time[:-2]

        baseTime = list(map(int, hour.split(':')))
        hour = baseTime[0] if len(baseTime) == 1 else baseTime[0] + baseTime[1] / 60

        return hour + (12 if meridiem == 'pm' else 0)
    
    def isMonthValid(month, monthConstraint):
        monthConstraint = list(map(lambda x: DateConstraint.MONTHS[x], monthConstraint.split('-')))
        return month == monthConstraint if len(monthConstraint) == 1 else (
            month >= monthConstraint[0] and month <= monthConstraint[1] if monthConstraint[1] > monthConstraint[0] else 
            month >= monthConstraint[0] or month <= monthConstraint[1]
        )
    
    def isDayValid(day, dayConstraint):
        dayConstraint = list(map(lambda x: DateConstraint.DAYS[x], dayConstraint.split('-')))
        return day == dayConstraint if len(dayConstraint) == 1 else (
            day >= dayConstraint[0] and day <= dayConstraint[1] if dayConstraint[1] > dayConstraint[0] else
            day >= dayConstraint[0] or day <= dayConstraint[1]
        )
    
    def isTimeValid(month, day, hour):
        pass

class DatabaseSearch:
    PATH = 'database/toilet_map.csv'

    def distance(x1, y1, x2, y2):
        return math.sqrt(math.pow(x2 - x1, 2) + math.pow(y2 - y1, 2))

    def search(long, lat, hasParking = False, hasAccessibleParking = False, hasBabyChange = False, ):
        with open(DatabaseSearch.PATH, encoding="utf8") as file:
            reader = csv.DictReader(file)
            count = 0
            hours = set()
            for row in reader:
                if (row['OpeningHours'][0] != "O"):
                    hours.add(row['OpeningHours'])