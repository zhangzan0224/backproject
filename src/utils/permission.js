import store from '@/store';

export default {
  inserted (el, binding, vnode) {
    const { value } = binding;
    // console.log(value, '###!')['admin', 'user:add']
    const roles = store.getters && store.getters.roles;
    // console.log(roles, '###'); ['user:list', 'roles:add', 'roles:edit', 'user:edit', 'roles:del', 'roles:list', 'user:del'] '###'
    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value;
      const hasPermission = roles.some((role) => {
        return permissionRoles.includes(role);
      });

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      throw new Error(`使用方式： v-permission="[${'admin'}, ${'editor'}]"`);
    }
  }
};
