import { g as F } from "./index-e905afc7.js";
import {
  d as M,
  h,
  r as n,
  o as s,
  c as b,
  a,
  w as t,
  f as z,
  F as N,
  l as $,
  m as x,
  j as y,
  n as C,
  b as v,
  _ as S,
  s as A,
  q as E,
  p as R,
  e as j
} from "./index-20b05db2.js";
const q = { class: "batch-point" },
  O = { class: "manual-list" },
  T = M({
    __name: "PointInfo",
    emits: ["drawPoint"],
    setup(c, { emit: o }) {
      let e = h([{ lng: "", lat: "" }]);
      const p = () => {
          e.value.push({ lng: "", lat: "" });
        },
        w = (d) => {
          e.value.splice(d, 1);
        },
        _ = () => {
          o("drawPoint", e.value);
        },
        i = () => {
          (e.value = [{ lng: "", lat: "" }]), o("drawPoint", e.value);
        },
        l = () => {
          location.href = "/vue3-admin/file/batchPoint.xlsx";
        },
        D = (d) => {
          o(
            "drawPoint",
            d.map((u) => ({
              address: u.address,
              lng: u.coordinate.split(",")[0],
              lat: u.coordinate.split(",")[1]
            }))
          );
        };
      return (d, u) => {
        const g = n("svg-icon"),
          r = n("a-button"),
          V = n("a-input"),
          I = n("a-space"),
          P = n("a-tab-pane"),
          U = n("file-upload"),
          B = n("a-tabs"),
          L = n("a-popover");
        return (
          s(),
          b("div", q, [
            a(
              L,
              { title: "", trigger: "click", position: "bl", style: { width: "360px" } },
              {
                content: t(() => [
                  a(
                    B,
                    { "default-active-key": "1" },
                    {
                      default: t(() => [
                        a(
                          P,
                          { key: "1", title: "手动输入" },
                          {
                            default: t(() => [
                              z("div", O, [
                                (s(!0),
                                b(
                                  N,
                                  null,
                                  $(
                                    y(e),
                                    (m, k) => (
                                      s(),
                                      x(
                                        I,
                                        { key: k },
                                        {
                                          default: t(() => [
                                            a(
                                              V,
                                              {
                                                class: "input-lng",
                                                placeholder: "请输入经度",
                                                "allow-clear": "",
                                                modelValue: m.lng,
                                                "onUpdate:modelValue": (f) => (m.lng = f)
                                              },
                                              null,
                                              8,
                                              ["modelValue", "onUpdate:modelValue"]
                                            ),
                                            a(
                                              V,
                                              {
                                                class: "input-lat",
                                                placeholder: "请输入纬度",
                                                "allow-clear": "",
                                                modelValue: m.lat,
                                                "onUpdate:modelValue": (f) => (m.lat = f)
                                              },
                                              null,
                                              8,
                                              ["modelValue", "onUpdate:modelValue"]
                                            ),
                                            k === y(e).length - 1
                                              ? (s(),
                                                x(g, {
                                                  key: 0,
                                                  class: "coordinate-add",
                                                  name: "add",
                                                  size: "20px",
                                                  onClick: p
                                                }))
                                              : C("", !0),
                                            y(e).length > 1
                                              ? (s(),
                                                x(
                                                  g,
                                                  {
                                                    key: 1,
                                                    class: "coordinate-delete",
                                                    name: "delete",
                                                    size: "20px",
                                                    onClick: (f) => w(k)
                                                  },
                                                  null,
                                                  8,
                                                  ["onClick"]
                                                ))
                                              : C("", !0)
                                          ]),
                                          _: 2
                                        },
                                        1024
                                      )
                                    )
                                  ),
                                  128
                                ))
                              ]),
                              a(
                                I,
                                { class: "manual-actions" },
                                {
                                  default: t(() => [
                                    a(r, { onClick: i }, { default: t(() => [v("清除")]), _: 1 }),
                                    a(
                                      r,
                                      { type: "primary", onClick: _ },
                                      { default: t(() => [v("确定")]), _: 1 }
                                    )
                                  ]),
                                  _: 1
                                }
                              )
                            ]),
                            _: 1
                          }
                        ),
                        a(
                          P,
                          { key: "2", title: "数据导入" },
                          {
                            default: t(() => [
                              a(U, { onSuccess: D }),
                              a(
                                r,
                                { type: "text", onClick: l },
                                { default: t(() => [v("(模板下载)")]), _: 1 }
                              )
                            ]),
                            _: 1
                          }
                        )
                      ]),
                      _: 1
                    }
                  )
                ]),
                default: t(() => [
                  a(
                    r,
                    { class: "btn-batch", type: "primary" },
                    {
                      icon: t(() => [a(g, { name: "upload", size: "15px" })]),
                      default: t(() => [v(" 点位信息 ")]),
                      _: 1
                    }
                  )
                ]),
                _: 1
              }
            )
          ])
        );
      };
    }
  });
const G = S(T, [["__scopeId", "data-v-a13c51a9"]]),
  H = (c) => (R("data-v-67f8eca2"), (c = c()), j(), c),
  J = { class: "coordinate-point" },
  K = H(() => z("div", { id: "map-container", class: "map-container" }, null, -1)),
  Q = M({
    __name: "index",
    setup(c) {
      let o = A({}),
        e = h({});
      E(async () => {
        (e = await F()),
          (o.value = new e.Map("map-container", {
            zoom: 11,
            center: [116.397428, 39.90923],
            viewMode: "2D"
          }));
      });
      let p = h([]);
      const w = (_) => {
        o.value.clearMap(),
          (p.value = []),
          _.forEach((i) => {
            let l = h({});
            (l.value = new e.Marker({
              map: o.value,
              icon: new e.Icon({
                size: new e.Size(36, 36),
                image: new URL("/vue3-admin/assets/point-marker-2b2f6918.png", self.location).href,
                imageSize: new e.Size(36, 36),
                imageOffset: new e.Pixel(0, 0)
              }),
              position: [i.lng, i.lat],
              offset: new e.Pixel(-18, -36)
            })),
              p.value.push(l.value);
          }),
          o.value.setFitView();
      };
      return (_, i) => {
        const l = n("a-space");
        return (
          s(),
          b("div", J, [
            a(l, { class: "actions" }, { default: t(() => [a(G, { onDrawPoint: w })]), _: 1 }),
            K
          ])
        );
      };
    }
  });
const Y = S(Q, [["__scopeId", "data-v-67f8eca2"]]);
export { Y as default };
