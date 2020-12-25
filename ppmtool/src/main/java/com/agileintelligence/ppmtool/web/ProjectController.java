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
@CrossOrigin
public class ProjectController {
	@Autowired
	private ProjectService projectService;
	@Autowired
	private MapValidateErrorService mapValidationErrorService;

	@PostMapping("")
	// If we send empty object we get 500 Error(Internal server error) , if we use
	// @Valid it gives 400 error(bad request) i.e It makes response a little clear

	// Binding Result contains the validation object , if the object has errors then
	// it is mapped with Binding Result which we can use for better response object
	public ResponseEntity<?> createNewProject(@Valid @RequestBody Project project, BindingResult bindingResult,
			Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.mapValidateError(bindingResult);

		if (errorMap != null)
			return errorMap;

		return new ResponseEntity<Project>(projectService.saveOrUpdateProject(project, principal.getName()),
				HttpStatus.CREATED);
	}

	@GetMapping("/{projectId}")
	public ResponseEntity<?> getProjectById(@PathVariable String projectId, Principal principal) {
		Project project = projectService.findProjectByIdentifier(projectId, principal.getName());
		return new ResponseEntity<Project>(project, HttpStatus.OK);
	}

	@GetMapping("/all")
	public Iterable<Project> getAllProjects(Principal principal) {
		return projectService.findAllProjects(principal.getName());
	}

	@DeleteMapping("/{projectId}")
	public ResponseEntity<?> deleteProjectById(@PathVariable String projectId, Principal principal) {
		projectService.deleteProjectByIdentifier(projectId, principal.getName());
		return new ResponseEntity<Object>("Project with projectId '" + projectId.toUpperCase() + "' successfully deleted",
				HttpStatus.OK);
	}

}
