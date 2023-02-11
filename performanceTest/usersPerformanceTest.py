# -*- coding: utf-8 -*-
import time
from locust import HttpUser, task, between
from random_utils import get_random_string


class UsersPerformanceTest(HttpUser):
    host = "http://192.168.8.103:8082/api/v1/users"    # or (if on the same platform) "http://localhost:8082/api/v1/users"
    wait_time = between(1, 5)  # wait time between every task

    # run for each simulated user
    def on_start(self):
        # add
        self.userId = get_random_string(10)
        self.email = get_random_string(10)
        self.client.post(
            "/", json={"tokenUserId": self.userId, "name": "bar", "surname": "bar", "email": self.email})
        print("printing in sequence userId , srunmae e mail")
        print(self.userId)
        print(self.email)

    @task
    def CRUD(self):
        # edit
        self.client.post(
            "/"+self.userId, json={"name": "bar", "surname": "bar"},  name="/users/:id")        # required data only
        # list
        self.client.get("/")
        # get
        self.client.get("/"+self.userId, name="/users/:id")
