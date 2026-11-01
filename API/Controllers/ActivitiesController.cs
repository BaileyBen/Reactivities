using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities.Queries;
using Application.Activities.Queries.Commands;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<TheActivity>>> GetActivities()
        {
            return await Mediator.Send(new GetActivityList.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TheActivity>> GetActivityDetail(string id)
        {
            return await Mediator.Send(new GetActivityDetails.Query{Id = id});
        }

        [HttpPost]
        public async Task<ActionResult<string>> CreateActivity(TheActivity activity)
        {
            return await Mediator.Send(new CreateActivity.Command{Activity = activity});
        }

        [HttpPut]
        public async Task<ActionResult> EditActivity(TheActivity activity)
        {
            await Mediator.Send(new EditActivity.Command{Activity = activity});
            return NoContent();
        }
    }
}