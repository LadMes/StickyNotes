using TestTask3.Models;

namespace TestTask3.Data
{
    public static class MockData
    {
        public static void SeedDatabase(WebApplication app) 
        {
            var scope = app.Services.CreateScope();
            var context = scope.ServiceProvider.GetService<AppDbContext>();

            context.Comments.AddRange(comments);
            context.Dots.AddRange(dots);
            context.SaveChanges();
        }

        private static List<Comment> comments = new List<Comment>()
        {
            new Comment()
            {
                Id = 1,
                Text = "comment 1",
            },
            new Comment()
            {
                Id = 2,
                Text = "comment 2",
                BackgroundColorHex = "#FFFF00"
            },
            new Comment()
            {
                Id = 3,
                Text = "comment 3",
            },
            new Comment()
            {
                Id = 4,
                Text = "comment 4",
                BackgroundColorHex = "#BBBBBB"
            },
            new Comment()
            {
                Id = 5,
                Text = "comment 5",
            },
            new Comment()
            {
                Id = 6,
                Text = "comment 6 looooooooong comment",
                BackgroundColorHex = "#FFFF00"
            },
            new Comment()
            {
                Id = 7,
                Text = "comment 7",
                BackgroundColorHex = "#BBBBBB"
            },
            new Comment()
            {
                Id = 8,
                Text = "comment 8",
            }
        };

        private static List<Dot> dots = new List<Dot>()
        {
            new Dot()
            {
                Id = 1,
                X = 150,
                Y = 50,
                Radius = 25,
                ColorHex = "#AAAAAA",
                Comments = new List<Comment>() { comments[0], comments[1] }
            },

            new Dot()
            {
                Id = 2,
                X = 345,
                Y = 50,
                Radius = 45,
                ColorHex = "#FF0000",
                Comments = new List<Comment>() 
                { 
                    comments[2], 
                    comments[3], 
                    comments[4], 
                    comments[5],
                    comments[6],
                    comments[7]
                }
            }
        };
    }
}
