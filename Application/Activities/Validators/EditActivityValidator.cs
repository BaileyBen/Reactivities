using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities.DTOs;
using Application.Activities.Queries.Commands;

namespace Application.Activities.Validators
{
    public class EditActivityValidator : BaseActivityValidator<EditActivity.Command, EditActivityDto>
    {
        public EditActivityValidator() : base(x => x.ActivityDto)
        {
        }
    }
}