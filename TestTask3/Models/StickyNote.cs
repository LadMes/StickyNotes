namespace TestTask3.Models
{
    public class StickyNote
    {
        public int Id { get; set; }

        public Dot Dot { get; set; }

        public IList<Comment> Comments { get; set; } = new List<Comment>();
    }
}
