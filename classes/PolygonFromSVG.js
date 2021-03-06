/*
Usage:
// SVG embedded in HTML path defined via elem attribute
let block = new SVGBlock(world, { x: 300, y: 500, elem: 'puzzle', scale: 0.6, color: 'lime' }, { isStatic: true, friction: 0.0 });
// SVG in separate file path defined via file attribute
let block = new SVGBlock(world, { x: 580, y: 710, file: './path.svg', scale: 0.6, color: 'yellow' }, { isStatic: true, friction: 0.0 });
*/
class PolygonFromSVG extends Block {
  constructor(world, attrs, options) {
    super(world, attrs, options);
  }

  addBody() {
    let vertices;
    if (this.attrs.path) {
        // use a path provided directly
        vertices = Matter.Svg.pathToVertices(this.attrs.path, 10);
        this.body = Matter.Bodies.fromVertices(0, 0, Matter.Vertices.scale(vertices, this.attrs.scale, this.attrs.scale), this.options);
        Matter.Body.setPosition(this.body, this.getCenter(vertices));
    } else {
      if (this.attrs.elem) {
        // use a path of SVG embedded in current HTML page
        let path = document.getElementById(this.attrs.elem);
        if (null != path) {
          vertices = Matter.Svg.pathToVertices(path, 10);
          this.body = Matter.Bodies.fromVertices(0, 0, Matter.Vertices.scale(vertices, this.attrs.scale, this.attrs.scale), this.options);
          if (this.attrs.x) {
            Matter.Body.setPosition(this.body, this.attrs);
          } else {
            Matter.Body.setPosition(this.body, this.getCenter(vertices));
          }
        }
      } else {
        // use a path in separate SVG file
        let that = this;
        httpGet(this.attrs.file, "text", false, function(response) {
          const parser = new DOMParser();
          const svgDoc = parser.parseFromString(response, "image/svg+xml");
          const path = svgDoc.querySelector("path");
          vertices = Matter.Svg.pathToVertices(path, 10);
          that.body = Matter.Bodies.fromVertices(0, 0, Matter.Vertices.scale(vertices, that.attrs.scale, that.attrs.scale), that.options);
          if (this.attrs.x) {
            Matter.Body.setPosition(this.body, this.attrs);
          } else {
            Matter.Body.setPosition(this.body, this.getCenter(vertices));
          }
          Matter.World.add(engine.world, [that.body]);
        });
      }
    }
  }

  getCenter(vertices) {
    let min = {x: 999999, y: 999999};
    let max = {x: -999999, y: -999999};
    vertices.forEach((v, i) => {
      min.x = min.x > v.x ? v.x : min.x;
      min.y = min.y > v.y ? v.y : min.y;
      max.x = max.x < v.x ? v.x : max.x;
      max.y = max.y < v.y ? v.y : max.y;
    });
    return { x: min.x + (this.body.position.x - this.body.bounds.min.x), y: min.y + (this.body.position.y - this.body.bounds.min.y) }
  }
}
