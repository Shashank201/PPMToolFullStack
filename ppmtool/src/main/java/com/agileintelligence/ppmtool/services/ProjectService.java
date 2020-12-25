package com.agileintelligence.ppmtool.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.agileintelligence.ppmtool.domain.Backlog;
import com.agileintelligence.ppmtool.domain.Project;
import com.agileintelligence.ppmtool.domain.User;
import com.agileintelligence.ppmtool.exceptions.ProjectIdException;
import com.agileintelligence.ppmtool.exceptions.ProjectNotFoundException;
import com.agileintelligence.ppmtool.repositories.BacklogRepository;
import com.agileintelligence.ppmtool.repositories.ProjectRepository;
import com.agileintelligence.ppmtool.repositories.UserRepository;

@Service
public class ProjectService {

	@Autowired
	private ProjectRepository projectRepository;

	@Autowired
	private BacklogRepository backlogRepository;

	@Autowired
	private UserRepository userRepository;

	public Project saveOrUpdateProject(Project project, String userName) {
		
		if(project.getId() != null) {
			Project existingProject = findProjectByIdentifier(project.getProjectIdentifier(), userName);
			
			if(existingProject.getId() != project.getId()) {
				throw new ProjectNotFoundException("Project Id does not match the existing project");
			}
		}
		
		try {
			// Fetching user from username and setting it to project i.e. userid mapped to
			// project table
			User user = userRepository.findByUsername(userName);
			project.setUser(user);
			project.setProjectLeader(user.getUsername());

			String projectIdentifier = project.getProjectIdentifier().toUpperCase();
			project.setProjectIdentifier(projectIdentifier);

			// For new Project create new Backlog
			if (project.getId() == null) {
				Backlog backlog = new Backlog();
				project.setBacklog(backlog);
				backlog.setProject(project);
				backlog.setProjectIdentifier(projectIdentifier);
			}

			// For Update Project we need to set the backlog otherwise it will be null
			if (project.getId() != null) {
				project.setBacklog(backlogRepository.findByProjectIdentifier(projectIdentifier));
			}

			return projectRepository.save(project);
		} catch (Exception e) {
			throw new ProjectIdException(
					"Project Id '" + project.getProjectIdentifier().toUpperCase() + "' already exists");
		}

	}

	public Project findProjectByIdentifier(String projectId, String username) {
		Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());

		if (project == null) {
			throw new ProjectIdException("Project Id '" + projectId.toUpperCase() + "' does not exist");
		}

		if (!project.getProjectLeader().equals(username)) {
			throw new ProjectNotFoundException("Project not found in your account");
		}
		return project;
	}

	public Iterable<Project> findAllProjects(String username) {
		return projectRepository.findAllByProjectLeader(username);
	}

	public void deleteProjectByIdentifier(String projectId , String username) {
		Project project = findProjectByIdentifier(projectId , username);

		projectRepository.delete(project);
	}
}
