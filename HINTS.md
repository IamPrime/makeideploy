# Hints

## How person fit change the CODEOWNERS file?

You fit change the CODEOWNERS either by programming or for CLI if you use this kain command:

```bash
echo "* @<new-owner-name>" > CODEOWNERS
```

or if you wan put plenty owners:

```bash
echo "* @<owner-1> @<owner-2>" > CODEOWNERS
```

## How person fit change the test files

1. First-first, change the `time.ts` file
   * After dat one, change the `time.test.ts` file
   * Run the tests with this command:

    ```bash
    npm test tests/time.test.ts -- --watch
    ```

2. If na the `day.test.ts` file you wan change
   * First change the `time.ts` file
   * Then run the tests with this command:

```bash
npm test tests/day.test.ts -- --watch
```

or if you wan run all the tests:

```bash
npm test -- --watch
```

Remove the `-- --watch` flag if you wan stop the watch process.

**ABEG NOTE:** That watch flag go make the process continue to dey run, and e go dey run the tests again if you change anything for the test files.

## How person fit change the helper files

1. First-first, change the `constants.ts` file.  
This na because the changes wey you dun make for `time.ts` and `reasons.ts` files go affect am.

Alright, make I rewrite am for you for pidgin:

### If you don clone git repo wey you wan use start your own project, but you no want keep the original history or connection to the original repo

Na these steps you go follow:

1. Clone the repo:

    ```bash
    git clone https://github.com/original-owner/repo-name.git
    cd repo-name
    ```

2. Comot the .git folder to delete all the history:

    ```bash
    rm -rf .git
    ```

3. Start new git repo:

    ```bash
    git init
    ```

4. Add all the files to the new repo:

    ```bash
    git add .
    ```

5. Do your first commit:

    ```bash
    git commit -m "First commit"
    ```

6. If you wan push am to new GitHub repo:
   * Create new empty repo for GitHub
   * Add the new repo as remote:

     ```bash
     git remote add origin https://github.com/your-username/new-repo-name.git
     ```

   * Push your code to the new repo:
  
     ```bash
     git push -u origin master
     ```

This process go create new repo with only one commit, wey go remove all the history and connection to the original repo. The new repo go get the same files as the original one wey you clone, but e no go get any of the commit history or other metadata.

No forget say if the original repo get license, you still need to follow the terms even after you don create your new repo.
<--ENDHINTS.md-->