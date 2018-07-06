function test()  {
  console.log("f(): evaluated")
  return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.enumerable = false
    descriptor.configurable = false
    descriptor.value = [1, 3, 4]
    return descriptor
  }
}

class TT {
  @test()
  method () {}
}