package com.agileintelligence.ppmtool.web;

import java.security.Principal;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.agileintelligence.ppmtool.domain.ProjectTask;
import com.agileintelligence.ppmtool.services.MapValidateErrorService;
import com.agileintelligence.ppmtool.services.ProjectTaskService;

@RestController
@RequestMapping("/api/backlog")
@CrossOrigin
public class BacklogController {

	@Autowired
	private ProjectTaskService projectTaskService;

	@Autowired
	private MapValidateErrorService mapValidateErrorService;

	@PostMapping("/{backlog_id}")
	public ResponseEntity<?> addPTtoBacklog(@Valid @RequestBody ProjectTask projectTask, BindingResult bindingResult,
			@PathVariable String backlog_id, Principal principal) {

		ResponseEntity<?> errorMap = mapValidateErrorService.mapValidateError(bindingResult);

		if (errorMap != null) {
			return errorMap;
		}

		ProjectTask projectTask1 = projectTaskService.addProjectTask(projectTask, backlog_id.toUpperCase(),
				principal.getName());

		return new ResponseEntity<ProjectTask>(projectTask1, HttpStatus.CREATED);
	}

	@GetMapping("/{backlog_id}")
	public Iterable<ProjectTask> getProjectBacklog(@PathVariable String backlog_id, Principal principal) {
		return projectTaskService.findBacklogById(backlog_id, principal.getName());
	}

	@GetMapping("/{backlog_id}/{pt_id}")
	public ResponseEntity<?> getPTByProjectSequence(@PathVariable String backlog_id, @PathVariable String pt_id , Principal principal) {
		ProjectTask projectTask = projectTaskService.findProjectTaskByProjectSequence(pt_id.toUpperCase(),
				backlog_id.toUpperCase() , principal.getName());
		return new ResponseEntity<ProjectTask>(projectTask, HttpStatus.OK);
	}

	@PatchMapping("/{backlog_id}/{pt_id}")
	public ResponseEntity<?> updateProjectTaskByProjectSequence(@Valid @RequestBody ProjectTask updatedTask,
			BindingResult result, @PathVariable String backlog_id, @PathVariable String pt_id , Principal principal) {

		ResponseEntity<?> errorMap = mapValidateErrorService.mapValidateError(result);
		if (errorMap != null) {
			return errorMap;
		}

		ProjectTask projectTask = projectTaskService.updateProjectTaskBySequence(updatedTask, backlog_id, pt_id , principal.getName());
		return new ResponseEntity<ProjectTask>(projectTask, HttpStatus.OK);
	}

	@DeleteMapping("/{backlog_id}/{pt_id}")
	public ResponseEntity<?> deleteProjectTaskByProjectSequence(@PathVariable String backlog_id,
			@PathVariable String pt_id , Principal principal) {

		projectTaskService.deletePTByProjectSequence(backlog_id, pt_id , principal.getName());

		return new ResponseEntity<String>("Project Task with ID: '" + pt_id + "' deleted Successfully", HttpStatus.OK);
	}
}
