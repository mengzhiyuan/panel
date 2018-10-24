package com.bjsxt.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bjsxt.mapper.UserMapper;
import com.bjsxt.pojo.User;
import com.bjsxt.service.UsersService;
import com.bjsxt.vo.UserVo;

@Service
@Transactional
public class UsersServiceImpl implements UsersService {
	
	@Autowired
	private UserMapper userMapper;
	

	@Override
	public Integer addUser(UserVo users) {
		return null;
	}
}
