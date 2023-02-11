# -*- coding: utf-8 -*-
"""
Created on Sat Feb 11 10:58:50 2023

@author: daniele
"""

import random
import string


def get_random_string(length):
    # choose from all lowercase letter
    letters = string.ascii_lowercase
    result_str = ''.join(random.choice(letters) for i in range(length))
    return result_str