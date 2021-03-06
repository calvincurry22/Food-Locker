﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodLocker.Data;
using FoodLocker.Models;
using FoodLocker.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FoodLocker.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ViolationCategoryController : ControllerBase
    {
        private readonly ViolationCategoryRepository _vcRepository;
        public ViolationCategoryController(ApplicationDbContext context)
        {
            _vcRepository = new ViolationCategoryRepository(context);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            List<ViolationCategory> list = await _vcRepository.GetAll();
            if (list == null)
            {
                return NotFound();
            }
            return Ok(list);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var violationCategory = await _vcRepository.GetById(id);
            if (violationCategory == null)
            {
                return NotFound();
            }
            return Ok(violationCategory);
        }
    }
}
