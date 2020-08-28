const broadcastDirectMessage = async (userName, message) => {
    return asyncPipe(
        _getDestinationId,
        _getIgEntity('directThread'),
        _broadcastMessage(message)
    )(userName);
  };
  
  const asyncPipe = (...promises) => promises.reduceRight((f, g) => (x) => {
    console.log('f', f);
    console.log('g', g);
    console.log('x', x);  
    const h = g(x).then(f);
    console.log('h', h.then(() => {}));
    return h;
  });
  const pipe = (...fns) => (x) => fns.reduce((accum, fn) => fn(accum), x);
  
  const _getDestinationId = async (userName) => {
    const userId = await igClient.user.getIdByUsername(userName);
    const user = userId.toString();
    console.log(userId);
    return user;
  };
  
  function _getIgEntity(directThread)  {
    const func = async (destinationId) => {
      return igClient.entity[directThread]([await destinationId]);
    }
    return func;
  }
  
  const _broadcastMessage = (message) => {
    const func2 = async function (threadPromise) {
      const thread = await threadPromise;
      await thread.broadcastText(message);
      return true;
    }
    return func2;
  };