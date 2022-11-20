## gitigonre 不生效时重置

```shell
git rm -r --cached .
git add .
git commit -m 'update .gitignore'
git push -u origin master
```

1. gitignore 只能忽略那些原来没有被 track 的文件，如果某些文件已经被纳入了版本管理中，则修改.gitignore 是无效的。
2. 想要.gitignore 起作用，必须要在这些文件`不在暂存区中`才可以，.gitignore 文件只是忽略没有被 staged(cached)文件， 对于已经被 staged 文件，加入 ignore 文件时一定要先从 staged 移除，才可以忽略。
