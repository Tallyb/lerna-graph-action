import PackageGraph from '@lerna/package-graph';
import Project from '@lerna/project';

export async function buildGraph(cwd: string): Promise<string> {
  const project = await new Project(cwd);
  if (!project.config.version) {
    throw new Error(`Cannot find project in ${cwd}`);
  }
  const packages = await project.getPackages();
  const graph = new PackageGraph(packages);
  //console.log(graph);
  let dot = `digraph{`;

  for (const [, pkg] of graph) {
    for (const [, dep] of pkg.localDependencies)
      dot += `"${pkg.name} ${pkg.version}"->"${dep.name}";`;
  }
  dot += `}`;
  return dot;
}
