CREATE TABLE organization(
organization_id SERIAL PRIMARY KEY,
name VARCHAR(50) NOT NULL,
description TEXT NOT NULL,
contact_email VARCHAR(50) NOT NULL,
logo_filename VARCHAR(50) NOT NULL
);

INSERT INTO organization(name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers','An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png')


CREATE TABLE service_project(
project_id SERIAL PRIMARY KEY,
organization_id  INT  NOT NULL REFERENCES organization(organization_id),
title VARCHAR(100) NOT NULL,
description TEXT NOT NULL,
location VARCHAR(100) NOT NULL,
project_date DATE NOT NULL
)

INSERT INTO service_project(organization_id, title, description, location, project_date)
VALUES(1, 'Community playground build','Construct a safe playground for children', 'lagos','2026-08-10'),
	  (1,'Bridge repair project', 'Repair a damages communtiy bridge', 'Abuja', '2026-08-20'),
	  (1, 'School renovation', 'Renovated classroms and libries', 'Ibadan', '2026-09-05'),
	  (1, 'Water well installations', 'Install clean water wells', 'Kaduna', '2026-09-18'),
	  (1, 'Affordables housing builds', 'Constructs home for low-income familes', 'port-harcourt', '2026-10-02'),
	  (2, 'Community garden', 'Create a neighborhood community garden', 'Lagos', '2026-08-12'),
	  (2, 'Tree planting campaighn', 'Plant native trees across the city', 'Enugu', '2026-08-26'),
	  (2, 'Urban farming workshop', ' Tech sustanaible farming techniques', 'Benin city', '2026-09-08'),
	  (2, 'School farm projects', 'Develop school farm gardens', 'Jos', '2026-09-22'),
	  (2, 'Food sustanibility fair', 'Promote healthy food production', 'Abeokuta', '2026-10-06'),
	  (3, 'Food drive', ' Distribute food to families in need', 'Lagos', '2026-08-15'),
	  (3, 'Senior care visit', 'Support elderly residents through volunteer visits', 'Owerri', '2026-08-30'),
	  (3, 'Schhol supply donations', 'Provide learning materials to student', 'Kano', '2026-09-12'),
	  (3, ' Health awareness walk', 'Promote healthy lifestyles', 'Uyo', '2026-09-27'),
	  (3, 'Beach claenup', 'Organize volunteers to claen the beach', 'Calabar', '2026-10-10')


CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE project_category(
project_id INT NOT NULL ,
category_id INT NOT NULL,

PRIMARY KEY( project_id, category_id),
FOREIGN KEY (project_id)
REFERENCES service_project(project_id),

FOREIGN KEY (category_id)
REFERENCES category(category_id)
);

INSERT INTO category( category_name)
VALUES
('Community Service'),
('Education'),
('Enviromental'),
('Health and Wellness')

INSERT INTO project_category (project_id, category_id)
VALUES
(1, 1),
(2, 1),
(3, 2),
(4, 1),
(5, 1),
(6, 3),
(7, 3),
(8, 2),
(9, 2),
(10, 3),
(11, 1),
(12, 1),
(13, 2),
(14, 4),
(15, 3);
