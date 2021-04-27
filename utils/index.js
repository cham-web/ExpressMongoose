function backData(obj={code: 1, data: null, message: '成功'}, type) {
  const { code, data, message } = obj
  return {
    resuleCode: code || 1,
    data: type?{
      lsList: data,
      pageIndex: type.pageIndex,
      pageSize: type.pageSize,
      total: data.length
    }:data,
    message: message || '成功'
  }
}
module.exports = {backData}