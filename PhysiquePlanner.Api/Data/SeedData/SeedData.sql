-- Insert into Muscle table
INSERT INTO Muscle (Id, Name, Description)
VALUES
(1, 'Chest', 'The pectoral muscles located on the front of the upper body.'),
(2, 'Back', 'The large group of muscles that support the spine and shoulders.'),
(3, 'Shoulders', 'The deltoid muscles covering the shoulder joint.'),
(4, 'Biceps', 'The muscles located on the front of the upper arm.'),
(5, 'Triceps', 'The muscles on the back of the upper arm.'),
(6, 'Quads', 'The four-part muscle group on the front of the thigh.'),
(7, 'Hamstrings', 'The muscles on the back of the thigh.'),
(8, 'Calves', 'The muscles on the back of the lower leg.'),
(9, 'Abs', 'The abdominal muscles located on the front of the torso.');

-- Insert into Exercise table
INSERT INTO Exercise (Id, Name, Description)
VALUES
(1, 'Bench Press', 'A compound movement to strengthen the chest, shoulders, and triceps.'),
(2, 'Pull-Up', 'A bodyweight exercise to develop the back and biceps.'),
(3, 'Squat', 'A fundamental lower-body exercise targeting quads, hamstrings, and glutes.'),
(4, 'Deadlift', 'A compound exercise to develop the posterior chain including back, glutes, and hamstrings.'),
(5, 'Overhead Press', 'A shoulder press exercise that strengthens the deltoids and triceps.'),
(6, 'Barbell Curl', 'An isolation exercise for the biceps.'),
(7, 'Skull Crushers', 'An isolation triceps exercise performed with a barbell or dumbbells.'),
(8, 'Leg Press', 'A lower-body exercise targeting the quads and glutes.'),
(9, 'Calf Raise', 'A focused movement to develop the calves.');

-- Insert into ExerciseMuscle table
INSERT INTO ExerciseMuscle (ExerciseId, MuscleId)
VALUES
(1, 1), -- Bench Press targets Chest
(1, 3), -- Bench Press also targets Shoulders
(1, 5), -- Bench Press targets Triceps
(2, 2), -- Pull-Up targets Back
(2, 4), -- Pull-Up targets Biceps
(3, 6), -- Squat targets Quads
(3, 7), -- Squat targets Hamstrings
(4, 2), -- Deadlift targets Back
(4, 7), -- Deadlift targets Hamstrings
(5, 3), -- Overhead Press targets Shoulders
(5, 5), -- Overhead Press targets Triceps
(6, 4), -- Barbell Curl targets Biceps
(7, 5), -- Skull Crushers target Triceps
(8, 6), -- Leg Press targets Quads
(8, 7), -- Leg Press targets Hamstrings
(9, 8); -- Calf Raise targets Calves