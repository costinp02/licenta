from optapy import problem_fact, planning_id, planning_entity, planning_variable


# Problem facts
@problem_fact
class Room:
    def __init__(self, id, name, capacity, floor):
        self.id = id
        self.name = name
        self.capacity = capacity
        self.floor = floor

    @planning_id
    def get_id(self):
        return self.id
    
    def __str__(self):
        return f"Room(id={self.id}, name={self.name}, capacity={self.capacity}, floor={self.floor})"
    

@problem_fact
class Timeslot:
    def __init__(self, id, day_of_week, start_time, end_time):
        self.id = id
        self.day_of_week = day_of_week
        self.start_time = start_time
        self.end_time = end_time

    @planning_id
    def get_id(self):
        return self.id

    def __str__(self):
        return (
                f"Timeslot("
                f"id={self.id}, "
                f"day_of_week={self.day_of_week}, "
                f"start_time={self.start_time}, "
                f"end_time={self.end_time})"
        )
    
# Planning entities
@planning_entity
class Lesson:
    def __init__(self, id, subject, teacher, student_group, timeslot=None, room=None):
        self.id = id
        self.subject = subject
        self.teacher = teacher
        self.student_group = student_group
        self.timeslot = timeslot
        self.room = room

    @planning_id
    def get_id(self):
        return self.id

    @planning_variable(Timeslot, ["timeslotRange"])
    def get_timeslot(self):
        return self.timeslot

    def set_timeslot(self, new_timeslot):
        self.timeslot = new_timeslot

    @planning_variable(Room, ["roomRange"])
    def get_room(self):
        return self.room

    def set_room(self, new_room):
        self.room = new_room

    def __str__(self):
        return (
            f"Lesson("
            f"id={self.id}, "
            f"timeslot={self.timeslot}, "
            f"room={self.room}, "
            f"teacher={self.teacher}, "
            f"subject={self.subject}, "
            f"student_group={self.student_group}"
            f")"
        )