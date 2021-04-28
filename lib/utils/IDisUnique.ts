function IDIsUnique(id: string, ids: string[]) {
  return !ids.includes(id);
}

export { IDIsUnique };
