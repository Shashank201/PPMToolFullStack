package com.agileintelligence.ppmtool.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.agileintelligence.ppmtool.domain.Backlog;
import com.agileintelligence.ppmtool.domain.ProjectTask;
import com.agileintelligence.ppmtool.exceptions.ProjectNotFoundException;
import com.agileintelligence.ppmtool.repositories.ProjectTaskRepository;

@Service
public class ProjectTaskService {


	@Autowired
	private ProjectTaskRepository projectTaskRepository;

	@Autowired
	private ProjectService projectService;

	public ProjectTask addProjectTask(ProjectTask projectTask, String projectIdentifier, String username) {

		// Add PTs to a specific project , i.e. project != null , BL exists
		try {
			Backlog backlog = projectService.findProjectByIdentifier(projectIdentifier, username).getBacklog();
			// Project Sequence to be like this : PR01-1 , PRO1-2
			Integer BacklogSequence = backlog.getPTSequence();

			// Update Backlog Sequence
			BacklogSequence++;
			backlog.setPTSequence(BacklogSequence);
			// Set BL to PT
			projectTask.setBacklog(backlog);
			// Add sequence to Project Task
			projectTask.setProjectSequence(projectIdentifier + "-" + BacklogSequence);
			projectTask.setProjectIdentifier(projectIdentifier);
			// Initial Priority when priority is null
			if (projectTask.getPriority() == null || projectTask.getPriority() == 0) {
				projectTask.setPriority(3);
			}
			// Initial Status when status is null
			if (projectTask.getStatus() == null || projectTask.getStatus() == "") {
				projectTask.setStatus("TO_DO");
			}
		} catch (Exception e) {
			throw new ProjectNotFoundException("Project Not Found with ID:" + projectIdentifier);
		}

		return projectTaskRepository.save(projectTask);
	}

	public Iterable<ProjectTask> findBacklogById(String backlog_id, String username) {
		projectService.findProjectByIdentifier(backlog_id, username);

		return projectTaskRepository.findByProjectIdentifierOrderByPriority(backlog_id);
	}

	public ProjectTask findProjectTaskByProjectSequence(String pt_id, String backlog_id, String username) {

		// Make sure we are searching on existing backlog
		projectService.findProjectByIdentifier(backlog_id, username).getBacklog();

		// Make sure our task exist
		ProjectTask projectTask = projectTaskRepository.findByProjectSequence(pt_id);

		if (projectTask == null) {
			throw new ProjectNotFoundException("Project Task with ID: '" + pt_id + "' does not exists");
		}

		// Make sure backlog / projectTask in path correspond to right project
		if (!projectTask.getProjectIdentifier().equals(backlog_id)) {
			throw new ProjectNotFoundException(
					"Project Task with ID: '" + pt_id + "' does not exists in project: '" + backlog_id + "'");
		}

		return projectTask;
	}

	public ProjectTask updateProjectTaskBySequence(ProjectTask updatedTask, String backlog_id, String pt_id,
			String username) {

		ProjectTask projectTask = findProjectTaskByProjectSequence(pt_id, backlog_id, username);

		projectTask = updatedTask;
		return projectTaskRepository.save(projectTask);
	}

	public void deletePTByProjectSequence(String backlog_id, String pt_id, String username) {
		ProjectTask projectTask = findProjectTaskByProjectSequence(pt_id, backlog_id, username);

		projectTaskRepository.delete(projectTask);
	}

}
