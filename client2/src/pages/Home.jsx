import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

function Model(props) {
  const { nodes, materials } = useGLTF("/monster/monster.gltf");
  return (
    <group {...props} dispose={null}>
      <group
        position={[0, 1.307, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={1.171}
      >
        <mesh geometry={nodes.Body.geometry} material={materials.lambert2} />
        <mesh
          geometry={nodes.Body_fur.geometry}
          material={materials.Material}
        />
        <mesh
          geometry={nodes.eyes.geometry}
          material={materials.lambert2}
          position={[0, 0, 1.113]}
          scale={0.038}
        />
        <mesh
          geometry={nodes.Teeth.geometry}
          material={materials.lambert2}
          position={[0, 0, 1.113]}
          scale={0.038}
        />
        <mesh
          geometry={nodes.Top_Hair.geometry}
          material={materials.lambert2}
          position={[0, 0, 1.113]}
          scale={0.038}
        />
      </group>
    </group>
  );
}
function Model2(props) {
  const { nodes, materials } = useGLTF("/professor/professor.gltf");
  return (
    <group {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <mesh geometry={nodes.beard_geo.geometry} material={materials.Hair} />
        <mesh geometry={nodes.Body_geo.geometry} material={materials.Body} />
        <mesh geometry={nodes.Bowtie_geo.geometry} material={materials.Coat} />
        <mesh geometry={nodes.Coat_geo.geometry} material={materials.Coat} />
        <mesh geometry={nodes.Eye_geo.geometry} material={materials.Eyes} />
        <mesh geometry={nodes.Eyebrow_geo.geometry} material={materials.Hair} />
        <mesh geometry={nodes.Hair_geo.geometry} material={materials.Hair} />
        <mesh
          geometry={nodes.Pant_geo.geometry}
          material={materials.PAntandshirt}
        />
        <mesh
          geometry={nodes.Shirt_geo.geometry}
          material={materials.PAntandshirt}
        />
        <mesh geometry={nodes.Shoes_geo.geometry} material={materials.Shoe} />
        <mesh
          geometry={nodes.Specs_frame_geo.geometry}
          material={materials.Specs}
        />
        <mesh
          geometry={nodes.Specs_glass_geo.geometry}
          material={materials.Specs}
        />
        <mesh geometry={nodes.Teeth_geo.geometry} material={materials.Teeth} />
        <mesh
          geometry={nodes.Waistcoat_geo.geometry}
          material={materials.Coat}
        />
      </group>
    </group>
  );
}
function Home() {
  const user = useSelector((state) => state.user.user.user.user);

  const navigate = useNavigate();

  // const [selectedCharacter, setSelectedCharacter] = useState(null);

  // const handleCharacterSelection = (character) => {
  //   setSelectedCharacter(character);
  // };

  const [selectedDiv, setSelectedDiv] = useState(null); // This will track the selected div
  const handleSubmit = async () => {
    try {
      const data = await fetch(`/api/user/update_character/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ character: selectedDiv }),
      });

      const response = await data.json();

      if (response.success) {
        console.log("Character updated successfully");
      }

      console.log(response);
      navigate("/song_selection");
    } catch (error) {
      console.log(error);
    }
  };
  // Function to handle selection
  const toggleSelection = (divId) => {
    if (selectedDiv === divId) {
      setSelectedDiv(null); // If it's already selected, deselect it
    } else {
      setSelectedDiv(divId); // Else select the new div
    }
  };

  return (
    <div className="p-3 bg-[#234795] bg-opacity-90 lg:h-[90vh] h-[190vh]">
      <h1 className="text-2xl font-bold mb-4 text-center text-white py-8">
        Choose Your Character
      </h1>
      <div className="flex justify-evenly items-center flex-wrap gap-10">
        <div
          className={`divWithCanvas ${
            selectedDiv === "Monster" ? "selected" : ""
          }`}
          onClick={() => toggleSelection("Monster")}
        >
          <Canvas
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
            }}
            className="responsive-canvas"
          >
            <Suspense fallback={null}>
              {/* <directionalLight /> */}
              <spotLight
                intensity={0.9}
                angle={0.1}
                penumbra={1}
                position={[10, 15, 10]}
                castShadow
              />
              <Model scale={[1.5, 1.5, 1.5]} position={[0, -2, 0]} />{" "}
              {/* Adjust scale as needed */}
              <OrbitControls
                enablePan={true}
                enableZoom={false}
                enableRotate={true}
                minPolarAngle={Math.PI / 2.1}
                maxPolarAngle={Math.PI / 2.1}
              />
              <Environment preset="sunset" />
            </Suspense>
          </Canvas>
        </div>
        <div
          className={`divWithCanvas ${
            selectedDiv === "Professor" ? "selected" : ""
          }`}
          onClick={() => toggleSelection("Professor")}
        >
          <Canvas
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="responsive-canvas"
          >
            <Suspense fallback={null}>
              <directionalLight />
              <spotLight
                intensity={0.9}
                angle={0.1}
                penumbra={1}
                position={[10, 15, 10]}
                castShadow
              />
              <Model2 scale={[3.5, 3.5, 3.5]} position={[0, -2.4, 0]} />
              <OrbitControls
                enablePan={true}
                enableZoom={false}
                enableRotate={true}
                minPolarAngle={Math.PI / 2.1}
                maxPolarAngle={Math.PI / 2.1}
              />
              <Environment preset="sunset" />
            </Suspense>
          </Canvas>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          type="submit"
          className="mt-4 btn text-white font-bold py-2 px-4 rounded mx-auto hover:bg-white hover:border-orange-400 hover:text-orange-400 hover:transition-all hover:ease-in-out hover:duration-300"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Home;
