# -*- coding: utf-8 -*-
import time
from locust import HttpUser, task, between
from random_utils import get_random_string


class UsersPerformanceTest(HttpUser):
    host = "http://localhost:8082/api/v1/users"
    wait_time = between(1, 5)  # wait time between every task
    userId = get_random_string(10)

    # run for each simulated user
    def on_start(self):
        # add
        self.client.post(
            "/", json={"_id": self.userId, "name": "bar", "surname": "bar"})

    @task
    def CRUD(self):
        # edit
        self.client.post(
            "/"+self.userId, json={"_id": "foo", "name": "bar", "surname": "bar"},  name="/users/:id")        # required data only
        # list
        self.client.get("/")
        # get
        self.client.get("/"+self.userId, name="/users/:id")
