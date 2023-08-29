using System.Text.Json;
using API.Data;
using API.Entitites;
using API.Extensions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  
    public class ProductsController : BaseApiController
    {
        private readonly StoreContext _context;
     
        public ProductsController(StoreContext context)
        {
            _context = context;            
        }

        [HttpGet] //api/products
        public async Task<ActionResult<PagedList<Product>>> GetProductsAsync([FromQuery] ProductParams productParams)
        {
            var query  = _context.Products
                            .Filter(productParams.Brands, productParams.Types)                           
                            .Search(productParams.SearchTerm)
                             .Sort(productParams.OrderBy)
                            .AsQueryable();                  
            var products = await PagedList<Product>.ToPagedList(query, productParams.PageNumber, productParams.PageSize);   

            Response.AddPaginationHeader(products.MetaData);

            return Ok(products);    
        }

        [HttpGet("{id}")] //api/products/3
        public async Task<ActionResult<Product>> GetProductAsync(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if(product==null)
                return NotFound();

            return Ok(product);
        }

        [HttpGet("filters")] //api/filters
        public async Task<IActionResult> GetFiltersAsync()
        {
            var brands = await _context.Products.Select(x=>  x.Brand).Distinct().ToListAsync();
           var types = await _context.Products.Select(x=>  x.Type).Distinct().ToListAsync();

            return Ok(new {
                Brands = brands,
                Types = types
            });
        }
    }
}