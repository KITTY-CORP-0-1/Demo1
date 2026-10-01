/* ── Color palette ─────────────────────────────────── */
export const COLORS = {
  bgPrimary:  '#05070d',
  bgSecondary:'#0a0e1a',
  cyan:       '#00e5ff',
  amber:      '#ffb347',
  magenta:    '#ff2d7b',
  green:      '#00ff88',
  white:      '#e0e6f0',
  grey:       '#7a8ba8',
}

/* ── Chapter definitions ──────────────────────────── */
export const CHAPTERS = [
  { id: 'boot',        title: 'SYSTEM BOOT',            short: 'Boot' },
  { id: 'problem',     title: 'THE PROBLEM',            short: 'Problem' },
  { id: 'perception',  title: 'PERCEPTION',             short: 'Vision' },
  { id: 'sensors',     title: 'SENSOR FUSION',          short: 'Sensors' },
  { id: 'decision',    title: 'DECISION ENGINE',        short: 'Decision' },
  { id: 'simulation',  title: 'NAVIGATION DEMO',        short: 'Demo' },
  { id: 'sentinel',    title: 'SENTINEL MODE',          short: 'Patrol' },
  { id: 'usecases',    title: 'USE CASES',              short: 'Uses' },
  { id: 'techstack',   title: 'TECH STACK',             short: 'Tech' },
  { id: 'performance', title: 'PERFORMANCE',            short: 'Stats' },
  { id: 'team',        title: 'TEAM & ROADMAP',         short: 'Team' },
  { id: 'finale',      title: 'KITTY SENTINEL',         short: 'Finale' },
]

/* ── Camera keyframes per chapter ────────────────── */
export const CAMERA_KEYFRAMES = [
  { pos: [0,  1.5,  6],    target: [0, 0.5, 0],  fov: 50 }, // boot
  { pos: [4,  2,    5],    target: [0, 0.8, 0],  fov: 45 }, // problem
  { pos: [0,  0.8,  1.8],  target: [0, 0.7, 0],  fov: 35 }, // perception – close on face
  { pos: [3,  3,    4],    target: [0, 0.5, 0],  fov: 55 }, // sensor fusion – exploded
  { pos: [0,  3,    3.5],  target: [0, 1.5, 0],  fov: 50 }, // decision engine
  { pos: [0,  8,    0.1],  target: [0, 0,   0],  fov: 60 }, // simulation – top-down
  { pos: [-3, 1.5,  5],    target: [0, 0.5, 0],  fov: 45 }, // sentinel
  { pos: [5,  2,    4],    target: [0, 0.8, 0],  fov: 50 }, // use cases
  { pos: [0,  2,    5],    target: [0, 1,   0],  fov: 48 }, // tech stack
  { pos: [2,  1.5,  4.5],  target: [0, 0.6, 0],  fov: 45 }, // performance
  { pos: [-2, 1.8,  5],    target: [0, 0.8, 0],  fov: 48 }, // team
  { pos: [0,  1.2,  4],    target: [0, 0.6, 0],  fov: 42 }, // finale
]

/* ── Robot state colors ──────────────────────────── */
export const ROBOT_STATES = {
  idle:     { eye: COLORS.amber,   body: COLORS.cyan },
  scanning: { eye: COLORS.cyan,    body: COLORS.cyan },
  tracking: { eye: COLORS.amber,   body: COLORS.amber },
  alert:    { eye: COLORS.magenta, body: COLORS.magenta },
  reached:  { eye: COLORS.green,   body: COLORS.green },
}

/* ── Sensor data for exploded view ───────────────── */
export const SENSOR_PARTS = [
  {
    id: 'camera',
    name: 'RGB Camera Module',
    desc: 'Wide-angle camera for real-time object detection and scene understanding via YOLO / MobileNet-SSD.',
    position: [0, 1.2, 0.6],
    color: COLORS.cyan,
  },
  {
    id: 'lidar',
    name: 'LiDAR / Ultrasonic Array',
    desc: 'Distance-measuring sensors mounted on ears for 360° obstacle detection and depth mapping.',
    position: [0, 1.5, 0],
    color: COLORS.green,
  },
  {
    id: 'imu',
    name: 'IMU (Inertial Measurement Unit)',
    desc: '6-axis gyroscope + accelerometer for balance, orientation, and motion tracking.',
    position: [0, 0.6, 0],
    color: COLORS.amber,
  },
  {
    id: 'compute',
    name: 'Compute Board (Jetson Nano)',
    desc: 'NVIDIA Jetson Nano running inference for vision models, path planning, and motor control.',
    position: [0, 0.8, -0.2],
    color: COLORS.magenta,
  },
  {
    id: 'motors',
    name: 'Servo Motor Drivers',
    desc: '12 servo motors (3 per leg) controlled via PCA9685 PWM driver for smooth quadruped locomotion.',
    position: [0, 0.3, 0],
    color: COLORS.white,
  },
]

/* ── Tech stack data ─────────────────────────────── */
export const TECH_LAYERS = [
  {
    name: 'Hardware',
    color: COLORS.amber,
    items: ['Raspberry Pi 5 / Jetson Nano', 'PCA9685 Servo Driver', '12× SG90 Servos', 'HC-SR04 Ultrasonic', 'OV5647 Camera', 'MPU6050 IMU', 'ESP32 (wireless)'],
  },
  {
    name: 'Perception',
    color: COLORS.cyan,
    items: ['OpenCV', 'YOLOv8 / MobileNet-SSD', 'Depth Estimation (MiDaS)', 'Scene Understanding VLM', 'Sensor Fusion Pipeline'],
  },
  {
    name: 'Planning',
    color: COLORS.green,
    items: ['A* / RRT Path Planning', 'Dynamic Obstacle Avoidance', 'Behavior Tree / FSM', 'ROS2 Nav2 Stack', 'PyTorch / TensorFlow Lite'],
  },
  {
    name: 'Control',
    color: COLORS.magenta,
    items: ['PID Motor Control', 'Inverse Kinematics', 'Gait Generator', 'Arduino / ESP32 Firmware', 'Serial / I2C Communication'],
  },
]

/* ── Use cases ───────────────────────────────────── */
export const USE_CASES = [
  { title: 'Home Security',            icon: '🏠', desc: 'Autonomous patrol of home perimeters with intruder detection and real-time alerts.' },
  { title: 'Warehouse Patrol',         icon: '🏭', desc: 'Continuous monitoring of warehouse aisles, detecting spills, obstructions, and unauthorized access.' },
  { title: 'Search & Rescue',          icon: '🔍', desc: 'Navigate collapsed structures, locate survivors via thermal + vision AI in disaster zones.' },
  { title: 'Elderly Assistance',       icon: '🤝', desc: 'Fall detection, medication reminders, and companionship for independent-living seniors.' },
  { title: 'Campus Inspection',        icon: '🏫', desc: 'Scheduled patrol of campuses and industrial sites for safety compliance monitoring.' },
]

/* ── Team placeholder ────────────────────────────── */
export const TEAM_MEMBERS = [
  { name: '[Team Member 1]', role: 'Vision AI Lead',       avatar: '🧠' },
  { name: '[Team Member 2]', role: 'Hardware & Embedded',   avatar: '⚙️' },
  { name: '[Team Member 3]', role: 'Navigation & Planning', avatar: '🗺️' },
  { name: '[Team Member 4]', role: 'Full-Stack & 3D Web',   avatar: '🌐' },
]

/* ── Roadmap ─────────────────────────────────────── */
export const ROADMAP = [
  { phase: 'Phase 1', title: 'Core Vision & Navigation', status: 'done',    desc: 'Object detection, obstacle avoidance, goal-based navigation' },
  { phase: 'Phase 2', title: 'SLAM & Mapping',           status: 'current', desc: 'Real-time 3D mapping with Visual SLAM for unknown environments' },
  { phase: 'Phase 3', title: 'Voice Commands',            status: 'next',    desc: 'Natural language instruction via on-device speech recognition' },
  { phase: 'Phase 4', title: 'Multi-Robot Swarm',         status: 'next',    desc: 'Coordinated patrol with multiple Sentinel units sharing maps' },
  { phase: 'Phase 5', title: 'On-Device VLM',             status: 'next',    desc: 'Edge-deployed vision-language model for complex scene reasoning' },
]

/* ── Performance metrics ─────────────────────────── */
export const METRICS = [
  { label: 'Detection Latency',         value: 45,   unit: 'ms',  note: '[REPLACE WITH REAL NUMBER]' },
  { label: 'Inference FPS',             value: 30,   unit: 'fps', note: '[REPLACE WITH REAL NUMBER]' },
  { label: 'Obstacle Avoidance Rate',   value: 97.3, unit: '%',   note: '[REPLACE WITH REAL NUMBER]' },
  { label: 'Battery Life',              value: 4.5,  unit: 'hrs', note: '[REPLACE WITH REAL NUMBER]' },
  { label: 'Path Replanning Time',      value: 12,   unit: 'ms',  note: '[REPLACE WITH REAL NUMBER]' },
  { label: 'Sensor Range (Ultrasonic)', value: 400,  unit: 'cm',  note: '[REPLACE WITH REAL NUMBER]' },
]
