% Ensure all projects use the same dependency versions (allow exceptions for 'peerDependencies').
gen_enforced_dependency(WorkspaceCwd, DependencyIdent, DependencyRange2, DependencyType) :-
  workspace_has_dependency(WorkspaceCwd, DependencyIdent, DependencyRange, DependencyType),
  workspace_has_dependency(OtherWorkspaceCwd, DependencyIdent, DependencyRange2, DependencyType2),
  DependencyType \= 'peerDependencies',
  DependencyType2 \= 'peerDependencies'.

% Ensure all projects use the 'workspace:*' dependency version for workspace projects (allow exceptions for 'peerDependencies').
gen_enforced_dependency(WorkspaceCwd, DependencyIdent, 'workspace:*', DependencyType) :-
  workspace_has_dependency(WorkspaceCwd, DependencyIdent, DependencyRange, DependencyType),
  workspace_ident(DependencyCwd, DependencyIdent),
  DependencyType \= 'peerDependencies'.
