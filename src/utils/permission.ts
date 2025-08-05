import router from "@/router";
import useRouterCacheStore from "@/store/modules/routerCache";

router.beforeEach((to, from, next) => {
  // 判断页面是否需要缓存
  if (Array.isArray(from.meta.lastPageCache) && from.meta.lastPageCache.includes(to.name)) {
    const routerCacheStore = useRouterCacheStore();
    routerCacheStore.addRouterCache(from.name as string);
  }

  if (!to.matched || to.matched.length === 0) {
    next("/404");
  } else {
    next();
  }
});
