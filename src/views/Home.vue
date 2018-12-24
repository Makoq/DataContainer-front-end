<template>
  <div>
    <home-header></home-header>
    <div class="first-screen">
      <div id="canvas"></div>
      <div class="first-bg"></div>
      <div class="panel">
        <div class="welcome">Welcome to Data Service Container</div>
      </div>
    </div>
    <home-footer></home-footer>
  </div>
</template>

<script>
// @ is an alias to /src
import homeHeader from "@/components/headers/HomeHeader";
import homeFooter from "@/components/headers/HomeFooter";
import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";

export default {
  name: "home",
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      particle: null,
      mouseX: 0,
      mouseY: 0
    };
  },
  components: { homeHeader, homeFooter },
  methods: {
    init() {
      let contanier = document.getElementById("canvas");
      this.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        1,
        5000
      );
      this.camera.position.z = 1000;

      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x3b3e43);

      let material = new THREE.SpriteMaterial({
        map: new THREE.CanvasTexture(this.generateSprite()),
        blending: THREE.AdditiveBlending
      });

      for (var i = 0; i < 1000; i++) {
        this.particle = new THREE.Sprite(material);
        this.initParticle(this.particle, i * 10);
        this.scene.add(this.particle);
      }

      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      contanier.appendChild(this.renderer.domElement);

      document.addEventListener(
        "mousemove",
        event => {
          this.mouseX = event.clientX - window.innerWidth / 2;
          this.mouseY = event.clientY - window.innerHeight / 2;
        },
        false
      );

      window.addEventListener(
        "resize",
        () => {
          this.camera.aspect = window.innerWidth / window.innerHeight;
          this.camera.updateProjectionMatrix();
          this.renderer.setSize(window.innerWidth, window.innerHeight);
        },
        false
      );
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.render();
    },
    render() {
      TWEEN.update();

      this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.05;
      this.camera.position.y += (-this.mouseY - this.camera.position.y) * 0.05;
      this.camera.lookAt(this.scene.position);

      this.renderer.render(this.scene, this.camera);
    },
    generateSprite() {
      let canvas = document.createElement("canvas");
      canvas.width = 16;
      canvas.height = 16;

      let context = canvas.getContext("2d");
      let gradient = context.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2
      );
      gradient.addColorStop(0, "rgba(255,255,255,1)");
      gradient.addColorStop(0.2, "rgba(0,255,255,1)");
      gradient.addColorStop(0.4, "rgba(0,0,64,1)");
      gradient.addColorStop(1, "rgba(0,0,0,1)");

      context.fillStyle = gradient;
      context.fillRect(0, 0, canvas.width, canvas.height);

      return canvas;
    },

    initParticle(particle, delay) {
      delay = delay !== undefined ? delay : 0;

      particle.position.set(0, 0, 0);
      particle.scale.x = particle.scale.y = Math.random() * 32 + 16;

      new TWEEN.Tween(particle)
        .delay(delay)
        .to({}, 10000)
        .onComplete(() => {
          this.initParticle(particle);
        })
        .start();

      new TWEEN.Tween(particle.position)
        .delay(delay)
        .to(
          {
            x: Math.random() * 4000 - 2000,
            y: Math.random() * 1000 - 500,
            z: Math.random() * 4000 - 2000
          },
          10000
        )
        .start();

      new TWEEN.Tween(particle.scale)
        .delay(delay)
        .to({ x: 0.01, y: 0.01 }, 10000)
        .start();
    },

    getGalleryStyle() {
      var img = require("@/assets/images/demo.png");
      var styleStr = `background:url(${img});`;
      return styleStr;
    }
  },
  mounted() {
    this.init();
    this.animate();
  }
};
</script>

<style lang="less" scoped>
.first-screen {
  height: 1080px;
}

#canvas {
  position: absolute;
  top: 0;
  left: 0;
}

.first-bg {
  background-image: url("../assets/images/bg3.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.6;
}

.panel {
  height: 700px;
  justify-content: center;
  display: flex;
  align-items: center;
}

.welcome {
  text-align: center;
  font-size: 36px;
  text-shadow: 0 0px 2px rgba(255, 255, 255, 1);
  z-index: 3;
  position: relative;
  top: -50px;
  color: #fff;
  line-height: 50px;
}
</style>
