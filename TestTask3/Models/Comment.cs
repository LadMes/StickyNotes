namespace TestTask3.Models
{
    public class Comment
    {
        public int Id { get; set; }

        public string Text { get; set; } = "";

        public string BackgroundColorHex { get; set; } = "#FFFFFF";


        public int StickyNoteId { get; set; }
    }
}
