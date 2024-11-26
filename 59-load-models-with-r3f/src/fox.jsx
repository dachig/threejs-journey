import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect } from "react";
import { useControls } from "leva";

export default function Fox(props) {
  const model = useGLTF("/Fox/glTF-Binary/Fox.glb");
  const animations = useAnimations(model.animations, model.scene);

  const { animationName } = useControls("foxAnimations", {
    animationName: { options: animations.names },
  });

  useEffect(() => {
    const action = animations.actions[animationName];
    action.reset().fadeIn(0.5).play();
    return () => {
      action.fadeOut(0.5).play();
    };
    // setTimeout(() => {
    //   animations.actions.Run.play();
    //   animations.actions.Run.crossFadeFrom(animations.actions.Survey, 1);
    // }, 2000);
  }, [animationName]);

  return <primitive {...props} object={model.scene} />;
}
