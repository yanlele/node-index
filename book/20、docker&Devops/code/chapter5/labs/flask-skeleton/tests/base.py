# Copyright 2016 Cisco Systems, Inc.
# All rights reserved.

from flask_testing import TestCase

from skeleton.server import app, db
from skeleton.server.models import User


class BaseTestCase(TestCase):

    def create_app(self):
        app.config.from_object('skeleton.server.config.TestingConfig')
        return app

    def setUp(self):
        db.create_all()
        user = User(email="ad@min.com", password="admin_user")
        db.session.add(user)
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
