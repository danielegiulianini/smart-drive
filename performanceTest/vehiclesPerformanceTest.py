# -*- coding: utf-8 -*-
import time
from locust import HttpUser, task, between
from random_utils import get_random_string


class UserVehiclesPerformanceTest(HttpUser):
    host = "http://192.168.8.103:8082/api/v1/vehicles"
    wait_time = between(1, 5)  # wait time between every task

    # run for each simulated user
    def on_start(self):
        # add
        self.vin = get_random_string(16)
        self.imageUrl = get_random_string(10)
        self.client.post(
            "/userVehicles/", json = {
                "_id": self.vin,
                "pictureUri": self.imageUrl})  # only id is required by mongoose model

    @task
    def CRUD(self):
        # edit
        self.client.post(
            "/userVehicles/" + self.vin, json={"pictureUri": self.imageUrl} , name="/userVehicles/:id")     
        # list
        self.client.get("/userVehicles/")
        # get
        self.client.get("/userVehicles/"+self.vin, name="/userVehicles/:id")
