import { defineComponent as N, computed as d, resolveComponent as S, resolveDirective as D, openBlock as m, createElementBlock as b, normalizeStyle as c, Fragment as q, renderList as E, withDirectives as y, createBlock as I, withModifiers as f, normalizeClass as p, withCtx as T, createVNode as C, createElementVNode as v } from "vue";
const $ = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [u, n] of t)
    s[u] = n;
  return s;
}, O = N({
  props: {
    menuCount: {
      type: Number,
      required: !0,
      default: 4
    },
    linkIconClassList: {
      type: Array,
      required: !0
    },
    itemTitleList: {
      type: Array,
      required: !0
    },
    tooltipData: {
      type: Array,
      required: !0
    },
    iconNameList: {
      type: Array,
      required: !0
    },
    urlsData: {
      type: Array,
      required: !0
    },
    backgroundColor: {
      type: String,
      default: "#20babb"
    },
    color: {
      type: String,
      default: "#fff"
    },
    position: {
      type: String,
      default: "top-left"
    }
  },
  setup(e) {
    const t = d(() => e.position.includes("top")), s = d(() => e.position.includes("left")), u = d(() => {
      const a = { top: "30px" }, r = { bottom: "30px" }, h = { left: "30px" }, L = { right: "30px" };
      let k = t.value ? a : r;
      return Object.assign(k, s.value ? h : L), Object.assign(k, { transform: s.value ? "rotate(-180deg)" : "rotate(180deg)" }), k;
    }), n = d(() => ({
      backgroundColor: e.backgroundColor,
      color: e.color
    })), l = d(() => ({
      backgroundColor: e.backgroundColor,
      color: e.color
    })), i = 60, M = [[["0", "-160"], ["-80", "-138.6"], ["-138.6", "-80"], ["-160", "0"]], [["0", "-160"], ["80", "-138.6"], ["138.6", "-80"], ["160", "0"]], [["0", "160"], ["138.6", "80"], ["80", "138.6"], ["160", "0"]], [["-160", "0"], ["-138.6", "80"], ["-80", "138.6"], ["0", "160"]]], g = [[["-160", "0"], ["-113", "-113"], ["0", "-160"]], [["0", "-160"], ["113", "-113"], ["160", "0"]], [["0", "160"], ["113", "113"], ["160", "0"]], [["-160", "0"], ["-113", "113"], ["0", "160"]]], o = [[["-160", "0"], ["0", "-160"]], [["0", "-160"], ["160", "0"]], [["0", "160"], ["160", "0"]], [["-160", "0"], ["0", "160"]]];
    return {
      isTop: t.value,
      isLeft: s.value,
      quickMenuStyle: u.value,
      buttonStyle: n.value,
      itemMenuStyle: l.value,
      menuCount: e.menuCount,
      linkIconClassList: e.linkIconClassList,
      itemTitleList: e.itemTitleList,
      tooltipData: e.tooltipData,
      iconNameList: e.iconNameList,
      urlsData: e.urlsData,
      backgroundColor: e.backgroundColor,
      color: e.color,
      menuSize: i,
      subMenu4: M,
      subMenu3: g,
      subMenu2: o
    };
  },
  methods: {
    getSubMenuStyle(e) {
      let t = this.menuCount === 4 ? this.subMenu4 : this.menuCount === 3 ? this.subMenu3 : this.subMenu2;
      return t = this.isTop && this.isLeft ? t[2] : this.isTop && !this.isLeft ? t[1] : !this.isTop && this.isLeft ? t[3] : t[0], { top: t[e][0] + "px", left: t[e][1] + "px" };
    },
    toggleMenu(e) {
      let t = this.$refs.quickMenu, s = this.$refs.link;
      ~t.className.indexOf(" active") ? (t.className = t.className.replace(" active", ""), s.forEach(function(u, n) {
        u.className = u.className.replace(" menu-animate", "");
      })) : (t.className += " active", s.forEach(function(u, n) {
        u.className += " menu-animate";
      }));
    },
    processCallback(e) {
      this.$emit("process", e);
    },
    mouseEnterSubMenu(e) {
      e.target.tagName === "A" ? e.target.style.backgroundColor = this.lightenColor(this.backgroundColor, 20) : e.target.tagName === "I" && (e.target.parentElement.style.backgroundColor = this.lightenColor(this.backgroundColor, 20));
    },
    mouseOutSubMenu(e) {
      e.target.tagName === "A" ? e.target.style.backgroundColor = this.backgroundColor : e.target.tagName === "I" && (e.target.parentElement.style.backgroundColor = this.backgroundColor);
    },
    lightenColor(e, t) {
      var s = !1;
      e[0] === "#" && (e = e.slice(1), s = !0);
      var u = parseInt(e, 16), n = (u >> 16) + t;
      n > 255 ? n = 255 : n < 0 && (n = 0);
      var l = (u >> 8 & 255) + t;
      l > 255 ? l = 255 : l < 0 && (l = 0);
      var i = (u & 255) + t;
      return i > 255 ? i = 255 : i < 0 && (i = 0), (s ? "#" : "") + (i | l << 8 | n << 16).toString(16);
    }
  }
}), A = ["id"], P = ["target", "href", "title"], F = ["target", "onClick", "title"], z = /* @__PURE__ */ v("div", { class: "bar" }, null, -1), V = [
  z
];
function w(e, t, s, u, n, l) {
  const i = S("svg-icon"), M = S("router-link"), g = D("tooltip");
  return m(), b("div", {
    class: "quick-menu",
    ref: "quickMenu",
    style: c(e.quickMenuStyle)
  }, [
    (m(!0), b(q, null, E(e.menuCount, (o, a) => (m(), b("div", {
      key: a,
      class: "menu-item",
      style: c(e.getSubMenuStyle(o - 1)),
      ref_for: !0,
      ref: "quickMenuItem_" + a,
      id: "quickMenuItem_" + a
    }, [
      e.urlsData[o - 1].type === "routeLink" ? y((m(), I(M, {
        key: 0,
        to: e.urlsData[o - 1].type,
        target: e.urlsData[o - 1].target,
        style: c(e.itemMenuStyle),
        onMouseover: f(e.mouseEnterSubMenu, ["stop"]),
        onMouseout: f(e.mouseOutSubMenu, ["stop"]),
        class: p(e.linkIconClassList[o - 1]),
        ref_for: !0,
        ref: "link",
        title: e.$t(e.itemTitleList[o - 1])
      }, {
        default: T(() => [
          C(i, {
            name: e.iconNameList[o - 1]
          }, null, 8, ["name"])
        ]),
        _: 2
      }, 1032, ["to", "target", "style", "onMouseover", "onMouseout", "class", "title"])), [
        [g, e.tooltipData[o - 1]]
      ]) : e.urlsData[o - 1].type === "external" ? y((m(), b("a", {
        key: 1,
        target: e.urlsData[o - 1].target,
        href: e.urlsData[o - 1].url,
        style: c(e.itemMenuStyle),
        onMouseover: t[0] || (t[0] = f((...r) => e.mouseEnterSubMenu && e.mouseEnterSubMenu(...r), ["stop"])),
        onMouseout: t[1] || (t[1] = f((...r) => e.mouseOutSubMenu && e.mouseOutSubMenu(...r), ["stop"])),
        class: p(e.linkIconClassList[o - 1]),
        ref_for: !0,
        ref: "link",
        title: e.$t(e.itemTitleList[o - 1])
      }, [
        C(i, {
          name: e.iconNameList[o - 1]
        }, null, 8, ["name"])
      ], 46, P)), [
        [g, e.tooltipData[o - 1]]
      ]) : y((m(), b("a", {
        key: 2,
        target: e.urlsData[o - 1].target,
        style: c(e.itemMenuStyle),
        onMouseover: t[2] || (t[2] = f((...r) => e.mouseEnterSubMenu && e.mouseEnterSubMenu(...r), ["stop"])),
        onMouseout: t[3] || (t[3] = f((...r) => e.mouseOutSubMenu && e.mouseOutSubMenu(...r), ["stop"])),
        onClick: (r) => e.processCallback(a),
        class: p(e.linkIconClassList[o - 1]),
        ref_for: !0,
        ref: "link",
        title: e.$t(e.itemTitleList[o - 1])
      }, [
        C(i, {
          name: e.iconNameList[o - 1]
        }, null, 8, ["name"])
      ], 46, F)), [
        [g, e.tooltipData[o - 1]]
      ])
    ], 12, A))), 128)),
    v("div", {
      class: "menu",
      style: c(e.buttonStyle)
    }, [
      v("div", {
        class: "core-menu",
        onClick: t[4] || (t[4] = (...o) => e.toggleMenu && e.toggleMenu(...o))
      }, V)
    ], 4)
  ], 4);
}
const B = /* @__PURE__ */ $(O, [["render", w]]), Q = {
  install: (e) => {
    e.component("Vue3QuickMenu", B);
  }
};
export {
  B as Vue3QuickMenu,
  Q as default
};
