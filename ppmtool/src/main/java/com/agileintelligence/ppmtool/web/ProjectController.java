package com.agileintelligence.ppmtool.web;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.agileintelligence.ppmtool.domain.Project;
import com.agileintelligence.ppmtool.services.MapValidateErrorService;
import com.agileintelligence.ppmtool.services.ProjectService;

@RestController
@RequestMapping("/api/project")
public class ProjectController {
	@Autowired
	private ProjectService projectService;
	@Autowired
	private MapValidateErrorService mapValidationErrorService;

	@PostMapping("")
	public ResponseEntity<?> createNewProject(@Valid @RequestBody Project project, BindingResult bindingResult) {

		ResponseEntity<?> errorMap = mapValidationErrorService.mapValidateError(bindingResult);

		if (errorMap != null)
			return errorMap;

		return new ResponseEntity<Project>(projectService.saveOrUpdateProject(project), HttpStatus.CREATED);
	}

	@GetMapping("/{projectId}")
	public ResponseEntity<?> getProjectById(@PathVariable String projectId) {
		Project project = projectService.findProjectByIdentifier(projectId);
		return new ResponseEntity <Project> (project , HttpStatus.OK);
	}
}
