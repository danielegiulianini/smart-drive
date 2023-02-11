# -*- coding: utf-8 -*-
from locust import HttpUser, task, between
from random_utils import get_random_string
import json

class UsersPerformanceTest(HttpUser):
    host = "http://192.168.8.103:8082/api/v1/trips"    # or (if on the same platform) "http://localhost:8082/api/v1/users"
    wait_time = between(1, 5)  # wait time between every task

    # run for each simulated user
    def on_start(self):
        # add
        tripInButes = self.client.post(
                "/", json={"sensorId": get_random_string(10)}).content
        trip_json = tripInButes.decode('utf8').replace("'", '"')
        self.trip = json.loads(trip_json)

    @task
    def CRUD(self):
        # list
        self.client.get("/")
        # get
        self.client.get("/"+ self.trip["_id"], name="api/v1/trips/:id")

    def on_stop(self):
        # close trip
        self.client.post("/"+self.trip["_id"], json={"sensorId": "bar"},  name="api/v1/trips/:id")        # required data only
