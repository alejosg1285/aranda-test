using Application;
using Application.Products;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public class ProductController : BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> CreateProduct(ProductRequest product)
        {
            return HandleResult(await Mediator.Send(new Create.Command{ Product = product }));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{ Id = id }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditProduct(int id, ProductRequest product)
        {
            product.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{ Product = product }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{ Id = id }));
        }

        [HttpPost]
        [Route("GetProducts")]
        public async Task<IActionResult> GetProducts([FromBody] FilterRequest request)
        {
            return HandleResult(await Mediator.Send(new Application.Products.List.Query{ FilterParams = request }));
        }
    }
}