// 部门管理对应的api
// 查询部门 /api/dept
import requests from '@/utils/requests';

export const reqGetDept = (params = null) => {
  // console.log('@!', params)
  return requests({
    url: '/api/dept',
    params
  });
};
// 查询部门:根据ID获取同级与上级数据获取同级和上级的数据 /api/dept/superior
export const reqGetSuperior = (data) =>
  requests({
    url: '/api/dept/superior',
    method: 'post',
    data
  });
