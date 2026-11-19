using Application.Activities.DTOs;
using Application.Activities.Queries.Commands;

namespace Application.Activities.Validators
{
    public class CreateActivityValidator : BaseActivityValidator<CreateActivity.Command, CreateActivityDto>
    {
        public CreateActivityValidator() : base(x => x.ActivityDto)
        {
        }
    }
}
