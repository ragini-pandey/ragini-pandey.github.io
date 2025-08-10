// import { useState } from 'react';
import { Container, Wrapper, Title, CardContainer } from './ProjectsStyle';
import ProjectCard from '../Cards/ProjectCards';
import { projects } from '../../data/constants';
import { CodeTitle } from '../Experience';

const Projects = ({ openModal, setOpenModal }) => {
  // const [toggle, setToggle] = useState('all');
  // const filteredProjects = toggle === 'all' ? projects : projects.filter((item) => item.category === toggle);

  return (
    <Container id="projects">
      <Wrapper>
        <CodeTitle>
          &lt; <span>Projects</span> /&gt;
        </CodeTitle>
        {/* <Desc>
          I have worked on a wide range of web apps. Here are some of my projects.
        </Desc>
        <ToggleButtonGroup>
          {['all', 'web app'].map((category) => (
            <ToggleButton
              key={category}
              active={toggle === category}
              value={category}
              onClick={() => setToggle(category)}
            >
              {category.toUpperCase()}
            </ToggleButton>
          ))}
        </ToggleButtonGroup> */}
        <CardContainer>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} openModal={openModal} setOpenModal={setOpenModal} />
          ))}
        </CardContainer>
      </Wrapper>
    </Container>
  );
};

export default Projects;
