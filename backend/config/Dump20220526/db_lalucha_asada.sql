CREATE DATABASE  IF NOT EXISTS `asadalaluchalave_db_lalucha` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `asadalaluchalave_db_lalucha`;
-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: db_lalucha
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `asada`
--

DROP TABLE IF EXISTS `asada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asada` (
  `idasada` int NOT NULL AUTO_INCREMENT,
  `mision` text NOT NULL,
  `vision` text NOT NULL,
  `historia` text NOT NULL,
  `schedule` text NOT NULL,
  `extension` varchar(200) NOT NULL DEFAULT 'Sin extensión',
  `address` text NOT NULL,
  `users` varchar(300) NOT NULL DEFAULT '0',
  `tanks` varchar(300) NOT NULL DEFAULT '0',
  `gradientes` varchar(300) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idasada`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asada`
--

LOCK TABLES `asada` WRITE;
/*!40000 ALTER TABLE `asada` DISABLE KEYS */;
INSERT INTO `asada` VALUES (1,'Nuestra misión es brindar agua para la vida, obteniendo el bienestar de la gente.  Contribuir en el desarrollo de nuestras comunidades, para lograr el éxito de todos. Trabajar en pro del cuido de las nacientes y sus alrededores, previendo el futuro de nuestros niños y jóvenes.','Brindar un servicio de calidad, cantidad y continuidad del agua potable. Innovar con tecnologías nuevas que faciliten el manejo del acueducto. Tener una comunicación oportuna con los abonados, brindándoles informes que fomenten la transparencia en las funciones que realizan los administradores. Implementar y mejorar los sistemas de información y de servicio al cliente. ','Por los años que antecedieron a 1980, muchas comunidades tenían limitaciones del servicio de agua.  La Lucha y fuera de esta área existían ya las comunidades de San Pedro, Javillos, El Molino, La Vega, las cuales todas carecían del servicio de agua potable. Con la consecuencia de grandes limitaciones en su desarrollo pleno.\n Cualquier actividad a realizar sería un gran esfuerzo para superar el no tener el preciado liquido, un pozo en la tierra. Algunas veces los vecinos tomaban agua de una canoa expuesta en el campo abierto. El chorro de agua que no todos lo tenían, aunque no fuera potable era parte de la solución Esto a la vez repercutía en enfermedades estomacales en los adultos, especialmente en los niños.\nMientras tanto los campesinos se integraban y gestionaban la adquisición y distribución de parcelas con reuniones celebradas en La Tigra, su gente lucha por adquirir parte de la tierra que pertenecía a la familia Matamoros quien era el dueño de La Hacienda.\nEl gobierno adquirió 1015 manzanas de tierra, las distribuyo en 94 parceleros y se formó la comunidad de La Lucha, en la fecha 07 de marzo de 1980, que fue cuando el presidente de Costa Rica entrego estas parcelas. \n Dichas tierras antes de repartirlas habían sido muy trabajadas, pero cuando las entregaron a los parceleros estaban en abandono, con montaña, tacotales, caminos de tierra abandonados. Lo que existía eran dos casas viejas deshabitadas. La hacienda se recibió con el compromiso de reforestarla, y así se hizo, se plantaron 14 arboles de corteza y danto amarillo. Para aprovecharlos en un futuro porque había que hacer un pueblo.\nDurante un año los parceleros se olvidaron que eran una comunidad y no se organizaban, por lo tanto, no se contaba con ningún servicio. Lo peor la falta de agua potable en los ranchos de las familias que habían construido en este lugar, los cuales eran sumamente humildes.\nA partir de 1981 se gestionó con la Universidad de Costa Rica para que, a través de la escuela Social, se lograra un diagnóstico sobre cómo organizar una comunidad. Además, recomendara el que hacer y como organizar la situación para lograr obtener los servicios. Durante mas de dos años se conto con el apoyo de un grupo de trabajadores sociales de la UCR. En el cual se realizó estudios de las necesidades y el orden de las prioridades en las cuales era necesario trabajar y gestionar. Es ahí donde comienza la historia del Acueducto. \nLa gente de Las comunidades de San Pedro, Javillos, La Vega y El Molino, se acercaron para hablar sobre el tema del agua potable. Se estableció un comité de gestión con vecinos, quedando conformado con personas de las diferentes comunidades.\nSe visito la oficina del AyA, y la casa presidencial en San José, para iniciar las gestiones del acueducto. El diagnóstico que brindo la UCR, estuvo listo para el año 1983. Al mismo tiempo las gestiones para crear la organización local y solución a los demás proyectos. Este plan para el agua potable era inicialmente para pocas previstas de agua. \nEl AyA, aprobó el proyecto de tubería, y solamente La comunidad de La Lucha, aporto 15 kilómetros de zanjeo aproximadamente, lo que significo 14.500 horas de trabajo a pico y pala. A cada dueño de prevista se le asigno un aporte de 160 horas por familia. Se daban tareas de 10 metros equivalente a 10 horas de trabajo. Todas las comunidades de igual forma realizaron el mismo aporte. Los diputados de esa época donaron partidas específicas a la Asociación de Desarrollo de La Lucha, la cual estaba recién constituida, además de los estudios técnicos necesarios para traer el agua de la finca de Vitaliano Vásquez de la zona alta de La Tigra. \nDon Vitaliano fue padre de 9 hijos, viudo muy joven, el cual era dueño de la finca donde esta el naciente de agua, es de rescatar que él y su familia fueron y son protectores incansables de la naturaleza. Actualmente todavía son propietarios de una parte de esa linda montaña, en ese entonces don Vitaliano con el mismo carisma que lo represento tubo la visión de que ese naciente diera el agua a las familias que lo necesitaran, sin imaginar la magnitud de importancia que llegaría a representar el acueducto.\nDesde 1982 que se inicia la construcción del acueducto, con la ayuda de un maestro de obra según cuentan algunos adultos mayores se llamaba Rodrigo López, quien resulto tener mucho conocimiento, además con la colaboración de todos los parceleros y vecinos de las comunidades mencionadas, se logró que un día sábado santo del año 1983, llegara el agua a las casas, lo cual provoco tanta alegría que hasta lagrimas hubo. El agua llego y con esto la vida para estas comunidades.\nLuego en el año 1985 se conformó un comité juramentado por la misma Asociación de Desarrollo para que fueran quienes administraran el funcionamiento del acueducto, inicialmente este comité fue conformado por: Gerardo Rojas Vásquez, presidente, Antonio Vásquez Jiménez secretario, Olger Reyner Jiménez Alvarado, Tesorero, Armando Murillo Rodríguez, Fiscal, Juan Luis Araya Zarate, vocal. \nEn el año 1999. Luego de varios intentos por constituir una Asociación lo cual resulto imposible pasar en el registro público, a causa de que se intento realizar con toda la población, a través de una recomendación de un abogado se acordó que se reunirían unos pocos abonados para poder constituir La Asociación de Acueducto Rural La lucha La Vega de San Carlos. Y así para el año 2003 fue declarada por el Ministerio de Justicia y Gracia de utilidad pública. También se inician gestiones para realizar un estudio técnico con el objetivo de analizar el estado actual del acueducto y las mejoras que requiere.\nEs importante mencionar que las diferentes Juntas Administradoras y el personal han realizado sus mejores esfuerzos por mejorar la Asada, en los diferentes componentes, cabe resaltar que a finales del 2014 se nombro a su primer administrador que se encargara de dirigir y ejecutar los acuerdos de Junta Directiva.  \nAl finalizar esta historia del acueducto quisiéramos referir un pensamiento que nos regala el señor Antonio Vásquez, ¡Que será de nosotros sin el preciado líquido!\nNuestro reconocimiento a todas las personas que de una u otra forma han colaborado en la construcción de este acueducto.\n','Lunes a Viernes - 8:00 AM a 5:00 PM\nSábados -  8:00 AM a 12:00 MD\n','34.2 km','25m Sur, 200m Este de algun lugar en la comunidad de la Tigra. La Tigra de la Vega de San Carlos','4511','31','64','2022-04-28 03:11:36','2022-05-24 01:29:55');
/*!40000 ALTER TABLE `asada` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-26 11:35:54
