using System;
using System.Collections.Generic;
using System.Text;
using FoodLocker.Models;
using FoodLocker.Repositories;
using Xunit;

namespace FoodLocker.Tests
{
    class EmployeeRepositoryTest : EFTestFixture
    {
        public EmployeeRepositoryTest()
        {
            AddSampleData();
        }

        private void AddSampleData()
        {
            var user1 = new User()
            {
                FirebaseUserId = "TEST_FIREBASE_UID_1",
                FirstName = "Nick",
                LastName = "Fury",
                Email = "nickfury@test.com",
                Password = "123456",
                BusinessName = "S.H.I.E.L.D Cafe",
                Image = ""
            };

            var user2 = new User()
            {
                FirebaseUserId = "TEST_FIREBASE_UID_2",
                FirstName = "Charles",
                LastName = "Xavier",
                Email = "charlesxavier@test.com",
                Password = "123456",
                BusinessName = "Xmen Cafe",
                Image = ""
            };

            var user3 = new User()
            {
                FirebaseUserId = "TEST_FIREBASE_UID_3",
                FirstName = "Adam",
                LastName = "Brashear",
                Email = "adambrashear@test.com",
                Password = "123456",
                BusinessName = "Blue Marvel Cafe",
                Image = ""
            };

            _context.Add(user1);
            _context.Add(user2);
            _context.Add(user3);


            var employee1 = new Employee()
            {
                FirstName = "Steve",
                LastName = "Rogers",
                UserId = 3,
                Title = " Produce Manager"
            };

            var employee2 = new Employee()
            {
                FirstName = "Tony",
                LastName = "Stark",
                UserId = 3,
                Title = "Deli Manager"
            };

            var employee3 = new Employee()
            {
                FirstName = "Thor",
                LastName = "Odinson",
                UserId = 3,
                Title = "Meat Manager"
            };

            _context.Add(employee1);
            _context.Add(employee2);
            _context.Add(employee3);
            _context.SaveChanges();
        }
    }
}
