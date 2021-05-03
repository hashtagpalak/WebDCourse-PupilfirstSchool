let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");

let loadImage = (src, callback) => {
  var img = document.createElement("img");
  img.onload = () => callback(img);
  img.src = src;
};

let setImagePath = (frameNumber, animation) => {
  return "images/" + animation + "/" + frameNumber + ".png";
};

let frame = {
  idle: [1, 2, 3, 4, 5, 6, 7, 8],
  kick: [1, 2, 3, 4, 5, 6, 7],
  punch: [1, 2, 3, 4, 5, 6, 7],
  block: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  forward: [1, 2, 3, 4, 5, 6],
  backward: [1, 2, 3, 4, 5, 6],
};

let loadImages = (callback) => {
  let images = {
    idle: [],
    kick: [],
    punch: [],
    block: [],
    forward: [],
    backward: [],
  };
let imagesToLoad = 0;

["idle", "kick", "punch", "block", "forward", "backward"].forEach(
    (animation) => {
      let animationFrames = frame[animation];
      imagesToLoad = imagesToLoad + animationFrames.length;

      animationFrames.forEach((frameNumber) => {
        let path = setImagePath(frameNumber, animation);
        loadImage(path, (image) => {
          images[animation][frameNumber - 1] = image;
          imagesToLoad = imagesToLoad - 1;

          if (imagesToLoad === 0) callback(images);
        });
      });
    }
  );
};

let x=0;
let animate = (ctx, images, animation, callback) => {
    images[animation].forEach((image, index) => {
      setTimeout(() => {
        if (image.src.includes("forward")&& x<576) {
            x += 20;
            ctx.clearRect(x, 400, 100, 500);
            ctx.drawImage(image, x, 100, 350, 350);
         }
         else if (image.src.includes("backward")&& x>0) {
          x -= 20;
        ctx.clearRect(x, 100, 500, 500);
        ctx.drawImage(image, x, 100, 350, 350);
         }
        ctx.clearRect(x, 0, 500, 500);
        ctx.drawImage(image, x, 100, 350, 350);
      }, index * 80);
    });
    setTimeout(callback, images[animation].length * 80);
  };

loadImages((images) => {
  let queuedAnimations = [];
  let aux = () => {
    let selectedAnimation;

    if (queuedAnimations.length === 0) selectedAnimation = "idle";
    else selectedAnimation = queuedAnimations.shift();

    animate(ctx, images, selectedAnimation, aux);
  };
  aux();

  document.getElementById("punch").onclick = () => {
    queuedAnimations.push("punch");
    
  };
  document.getElementById("kick").onclick = () => {
    queuedAnimations.push("kick");
    
  };
  document.getElementById("block").onclick = () => {
    queuedAnimations.push("block");
    
  };
  document.getElementById("forward").onclick = () => {
    queuedAnimations.push("forward");
    
  };
  document.getElementById("backward").onclick = () => {
    queuedAnimations.push("backward");
    
  };

  document.addEventListener("keypress", (event) => {
    const key = event.key; 

    if (key === "s") {
        queuedAnimations.push("kick");
      } else if (key === "w") {
        queuedAnimations.push("punch");
      } else if (key === "d") {
        queuedAnimations.push("forward");
      } else if (key === "a") {
        queuedAnimations.push("backward");
      } else if (key === " ") {
        queuedAnimations.push("block");
    }
  });
});
