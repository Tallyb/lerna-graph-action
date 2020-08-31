import PackageGraph from '@lerna/package-graph';
import Project from '@lerna/project';

export async function buildGraph(cwd: string): Promise<string> {
  const project = await new Project(cwd);
  if (!project.version) {
    throw new Error(`Cannot find project in ${cwd}`);
  }
  const packages = await project.getPackages();
  const graph = await new PackageGraph(packages);
  let dot = `digraph{`;

  for (const [, pkg] of graph) {
    for (const [, dep] of pkg.localDependencies) {
      //console.log('DEPP', packages.get(dep.name));
      dot += `"${pkg.name}\n${pkg.version}"->"${dep.name}\n${
        graph.get(dep.name).version
      }";`;
    }
  }
  dot += `}`;
  return dot;
}
