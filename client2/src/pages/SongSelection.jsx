import React, { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { AudioRecorder } from "react-audio-voice-recorder";
import { hardcoded_songs } from "./songs";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
import { useSelector } from "react-redux";

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

const Recorder = ({ recordedAudio, setRecordedAudio }) => {
  const [audioUrl, setAudioUrl] = useState(null);

  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    setAudioUrl(url);
    setRecordedAudio(blob);
  };

  return (
    <div>
      <AudioRecorder
        record={true}
        title={"New recording"}
        audioURL={(audioUrl) => {
          addAudioElement(audioUrl);
        }}
        onRecordingComplete={(blob) => {
          addAudioElement(blob);
        }}
        showUIAudio
      />

      {audioUrl && (
        <audio
          controls
          src={audioUrl}
          style={{ width: "100%", marginTop: "20px" }}
        />
      )}
    </div>
  );
};

const SongSelection = () => {
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const user = useSelector((state) => state.user.user.user.user);

  const handleSongSelect = (song) => {
    setSelectedSong(song);
  };

  const handleMixAudio = () => {
    // Logic to mix audio (not implemented here)
  };

  // const getSongs = async () => {
  //   // only get music of song like karaoke
  //   try {
  //     const response = await fetch(
  //       `https://api.spotify.com/v1/albums/4Q6vPI3bZK7guOKUzr9ijk`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     const data = await response.json();
  //     console.log(data);

  //     setSongs(data.tracks.items);
  //   } catch (error) {
  //     setError("Error fetching data");
  //   }
  // };

  // const getToken = async () => {
  //   try {
  //     const response = await fetch("https://accounts.spotify.com/api/token", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded",
  //       },
  //       body: "grant_type=client_credentials&client_id=cf007d9ab46e400b818407c1b547a9f4&client_secret=740909e5f5464ffbb2454accaa00f132",
  //     });

  //     const data = await response.json();

  //     setToken(data.access_token);
  //     getSongs();
  //   } catch (error) {
  //     setError("Error fetching data");
  //   }
  // };

  return (
    <div className="p-4 bg-[#234795] bg-opacity-90">
      <h1 className="text-2xl font-bold mb-4 text-center text-white py-6">
        Thanks for choosing a character
      </h1>
      <div className="flex items-center justify-center pb-7 text-center text-white">
        <h2 className="text-xl mr-2">{user.username}</h2>
        <img
          src={user?.profilePicture}
          className="w-12 h-12 rounded-full object-cover"
          alt="profile pic"
        />
      </div>
      <div className="mb-4">
        {user?.character === "Professor" ? (
          <div className="bg-[#1c140f] rounded-2xl h-[300px]">
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
        ) : (
          <div className="flex justify-evenly items-center flex-wrap gap-10">
            <div className="bg-[#1c140f] rounded-2xl h-[300px]">
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
          </div>
        )}
      </div>

      <div className="mt-12 flex justify-center">
        <h3 className="text-2xl font-bold mb-6 bg-[#1c140f] rounded-md text-white p-3">
          Choose your music
        </h3>
      </div>

      <div className="flex items-center flex-wrap gap-5 justify-around">
        {hardcoded_songs.map((song) => (
          <div key={song.id} className=" text-white mb-4">
            <h4 className="text-lg font-semibold">{song.name}</h4>
            <div className="flex items-center flex-col md:flex-row gap-4 mt-4">
              <audio controls className="">
                <source src={song.preview_url} type="audio/mpeg" />
              </audio>
              <button
                onClick={() => handleSongSelect(song)}
                className=" btn text-white font-bold py-2 px-4 rounded hover:bg-white hover:border-orange-400 hover:text-orange-400 hover:transition-all hover:ease-in-out hover:duration-300"
              >
                Select
              </button>
            </div>
          </div>
        ))}
      </div>

      <div>
        <div className="py-6 flex justify-center">
          <h1 className="text-2xl font-bold mb-3 bg-[#1c140f] rounded-md text-white p-3 ">
            Selected Music
          </h1>
        </div>

        {selectedSong && (
          <div className="flex flex-col items-center gap-4">
            <h4 className="text-lg font-semibold text-white">
              {selectedSong.name}
            </h4>
            <audio controls>
              <source src={selectedSong.preview_url} type="audio/mpeg" />
            </audio>
          </div>
        )}
      </div>

      <div className="mb-4">
        <div className=" mt-12 flex justify-center">
          <h3 className="text-2xl font-bold mb-3 bg-[#1c140f] rounded-md text-white p-3">
            Sing a song
          </h3>
        </div>
        <div className=" mt-3 flex justify-center">
          <Recorder
            recordedAudio={recordedAudio}
            setRecordedAudio={setRecordedAudio}
          />
        </div>

        {selectedSong && recordedAudio && (
          <div className="flex justify-center mt-12">
            <button
              onClick={handleMixAudio}
              className="btn text-white font-bold py-2 px-4 rounded hover:bg-white hover:border-orange-400 hover:text-orange-400 hover:transition-all hover:ease-in-out hover:duration-300"
            >
              Create Your Song
            </button>
          </div>
        )}
      </div>

      {/* Add a section to display the created song */}
      {/* Logic for displaying the created song goes here */}
    </div>
  );
};

export default SongSelection;
