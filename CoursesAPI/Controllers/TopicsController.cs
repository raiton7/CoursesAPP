using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CoursesAPI.Models;

namespace CoursesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TopicsController : ControllerBase
    {
        private readonly CoursesContext _context;

        public TopicsController(CoursesContext context)
        {
            _context = context;
        }

        // GET: api/Topics
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Topic>>> GetList()
        {
            return await _context.Topics
                .OrderBy(x => x.Number)
                .ToListAsync();
        }

        // GET: api/Topics/list/5
        [HttpGet("list/{courseId}")]
        public async Task<ActionResult<IEnumerable<Topic>>> GetListByCourseId(long courseId)
        {
            return await _context.Topics
                .Where(x => x.CourseId == courseId)
                .OrderBy(x => x.Number)
                .ToListAsync();
        }

        // GET: api/Topics/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Topic>> GetTopic(long id)
        {
            var topic = await _context.Topics.FindAsync(id);

            if (topic == null)
            {
                return NotFound();
            }

            return topic;
        }

        // PUT: api/Topics/5
        [HttpPut("{id}")]
        public async Task<IActionResult> EditTopic(long id, Topic topic)
        {
            if (id != topic.Id)
            {
                return BadRequest();
            }

            _context.Entry(topic).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TopicExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Topics
        [HttpPost]
        public async Task<ActionResult<Topic>> CreateTopic(Topic topic)
        {
            _context.Topics.Add(topic);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTopic", new { id = topic.Id }, topic);
        }

        // DELETE: api/Topics/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTopic(long id)
        {
            var topic = await _context.Topics.FindAsync(id);
            if (topic == null)
            {
                return NotFound();
            }

            _context.Topics.Remove(topic);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TopicExists(long id)
        {
            return _context.Topics.Any(e => e.Id == id);
        }
    }
}
