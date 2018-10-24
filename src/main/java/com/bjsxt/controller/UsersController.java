package com.bjsxt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.bjsxt.pojo.User;
import com.bjsxt.service.UsersService;
import com.bjsxt.vo.UserVo;

@Controller
@RequestMapping("/users")
public class UsersController {

	@Autowired
	private UsersService usersService;
	
	/**
	 * 页面跳转
	 */
/*	@RequestMapping("/{page}")
	public String showPage(@PathVariable String page){
		return page;
	}*/
	
	/**
	 * 添加用户
	 */
	@RequestMapping("/addUser")
	public String addUser(UserVo user){
		Integer result = usersService.addUser(user);
		System.out.println(result);
		
		return "ok";
	}
}
